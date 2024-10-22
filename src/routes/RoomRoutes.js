import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoomByCategory,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/RoomController.js";

const roomRouter = express.Router();

roomRouter.post("/", createRoom);
roomRouter.get("/", getRooms);
roomRouter.put("/:roomId", updateRoom);
roomRouter.delete("/:roomId", deleteRoom);
roomRouter.get("/:roomId", getRoomById);
roomRouter.get("/category/:category", getRoomByCategory);

export default roomRouter;
