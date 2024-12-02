import Booking from "../models/Booking.js";
import { isCustomerValid, isAdminValid } from "./UserController.js";

export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const startingId = 1800;

  Booking.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;

      const newBooking = new Booking({
        bookingId: newId,
        roomId: req.body.roomId,
        email: req.user.email,
        start: req.body.start,
        end: req.body.end,
      });

      newBooking
        .save()
        .then((result) => {
          res.json({
            message: "Booking created successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Booking creation failed",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        message: "Booking creation failed",
        error: err,
      });
    });
}

export function getBooking(req, res) {
  Booking.find().then((list) => {
    res.json({
      message: "Successfull",
      list: list,
    });
  });
}

export function getBookingById(req, res) {
  const id = req.params.bookingId;

  Booking.find({ bookingId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function getBookingByRoomId(req, res) {
  const id = req.params.roomId;

  Booking.find({ roomId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          roomId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function updateBooking(req, res) {
  if (!isCustomerValid(req) && !isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const id = req.params.bookingId;
  const updatedBooking = req.body;

  Booking.findOneAndUpdate({ bookingId: id }, updatedBooking)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: updatedBooking,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function deleteBooking(req, res) {
  if (!isCustomerValid(req) && !isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const id = req.params.bookingId;

  Booking.findOneAndDelete({ bookingId: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Booking not found",
          bookingId: id,
        });
      } else {
        res.status(201).json({
          message: "Booking deleted successfully",
          result: id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Booking deletion failed",
        error: err,
      });
    });
}
