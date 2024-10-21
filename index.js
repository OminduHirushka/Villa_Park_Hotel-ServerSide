import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/UserRoutes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import galleryRouter from "./src/routes/GlleryItemeRoutes.js";
import categoryRouter from "./src/routes/CategoryRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token != null) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

const connectionString = process.env.MONGO_URL;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/api/users", userRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/category", categoryRouter)

app.listen(5000, (req, res) => {
  console.log("Server is running on port 5000");
});
