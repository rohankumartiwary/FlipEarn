import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(cors());

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Hey");
});
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
=======
app.use("/api/inngest", serve({ client: inngest, functions }));


app.get("/",(req,res)=>{
    res.send("Server is running");
})



const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server running");
})
>>>>>>> a9c622eb6608da6066f59cb0ab3dd5a8cbbb1d12
