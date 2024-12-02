import express from "express";
import {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingById,
  getBookingByRoomId,
} from "../controllers/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBooking);
bookingRouter.put("/:bookingId", updateBooking);
bookingRouter.delete("/:bookingId", deleteBooking);
bookingRouter.get("/:bookingId", getBookingById);
bookingRouter.get("/room/:roomId", getBookingByRoomId);

export default bookingRouter;
