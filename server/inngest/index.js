import { Inngest } from "inngest";
import prisma from "../config/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "user.created" },
  async ({ event }) => {
    const { data } = event;
    //check if user already exists in db

    const user = await prisma.user.findFirst({
      where: { id: data.id },
    });

    if (user) {
      //update userdata if exits

      await prisma.user.update({
        where: { id: data.id },
        data: {
          email: data?.email_addresses[0]?.email_address,
          name: data?.first_name + " " + data?.last_name,
          image: data?.image_url,
        },
      });
      return;
    }

    await prisma.user.create({
      data: {
        id: data.id,
        email: data?.email_addresses[0]?.email_address,
        name: data?.first_name + " " + data?.last_name,
        image: data?.image_url,
      },
    });
  },
);

//delete a user from clerk and update the status of the listings to inactive if the user has any active listings or chats or transactions, otherwise delete the user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "user.deleted" },
  async ({ event }) => {
    const { data } = event;

    const listings = await prisma.listing.findMany({
      where: { ownerId: data.id },
    });

    const chats = await prisma.chat.findMany({
      where: { OR: [{ ownerUserId: data.id }, { chatUserId: data.id }] },
    });

    const transactions = await prisma.transaction.findMany({
      where: { userId: data.id },
    });

    if (
      listings.length === 0 &&
      chats.length === 0 &&
      transactions.length === 0
    ) {
      await prisma.user.delete({ where: { id: data.id } });
    } else {
      await prisma.listing.updateMany({
        where: { ownerId: data.id },
        data: { status: "inactive" },
      });
    }
  },
);

//ingest function to update the data in database
const syncUpdateCreation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "user.updated" },

  async ({ event }) => {
    const { data } = event;

    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data?.email_addresses[0]?.email_address,
        name: data?.first_name + " " + data?.last_name,
        image: data?.image_url,
      },
    });
  },
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUpdateCreation,
];
