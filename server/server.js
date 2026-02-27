import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app=express();
app.use("/api/inngest", (req, res, next) => {
  console.log("SIGNING KEY:", process.env.INNGEST_SIGNING_KEY);
  next();
}, serve({ client: inngest, functions }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Server is running");
})



const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server running");
})