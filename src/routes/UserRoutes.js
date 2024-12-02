import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUser);
userRouter.put("/:email", updateUser);
userRouter.delete("/:email", deleteUser);

export default userRouter;
