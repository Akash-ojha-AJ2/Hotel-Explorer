// index.js (CommonJS style)
import { config } from "dotenv";
config({ path: "./config.env" });
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import  Connection  from "./database/dbconnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import listingRouter from "./routes/listing.js";
import reviewRouter from "./routes/review.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

export const app = express();



// Allow requests from your frontend hosted on Vercel
const allowedOrigins = ['https://hotel-explorer-sepia.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you're using cookies or sessions
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/listing", listingRouter);
app.use("/api/v1/listing/:id/reviews", reviewRouter);


removeUnverifiedAccounts();
Connection();

app.use(errorMiddleware);
