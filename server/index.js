import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import route from "./routes/user.js";
dotenv.config();

mongoose.set("strictQuery", true);
const app = express();

app.use(morgan("dev")); // morgan is a Middleware which console logs all HTTP request in terminal

app.use(express.json({ limit: "30mb", extended: true })); //by Defaults imga eupload size is '100kb' so we need to set this
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/users", route); //http:

const MONGODB_URL =process.env.MONGO_URL

const port = process.env.PORT;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running in port ${port}`);
    });
  })
  .catch((err) => console.log(err));
