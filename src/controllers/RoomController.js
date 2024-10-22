import Room from "../models/Room.js";
import { isAdminValid } from "./UserController.js";

export function createRoom(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const room = req.body;

  const newRoom = new Room(room);
  newRoom
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Room created successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Category creation failed",
        error: err,
      });
    });
}

export function getRooms(req, res) {
  Room.find()
    .then((result) => {
      res.status(201).json({
        message: "Successfull",
        rooms: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function updateRoom(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const roomId = req.params.roomId;
  const updatedRoom = req.body;

  Room.findOneAndUpdate({ roomId: roomId }, updatedRoom, { new: true })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Room not found",
          name: roomId,
        });
      } else {
        res.status(200).json({
          message: "Successfull",
          result: updatedRoom,
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

export function getRoomById(req, res) {
  const roomId = req.params.roomId;

  Room
    .findOne({ roomId: roomId })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Room not found",
          name: roomId,
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

export function getRoomByCategory(req, res) {
  const roomCategory = req.params.category;

  Room
    .find({ category: roomCategory })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Room not found",
          name: roomCategory,
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

export function deleteRoom(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const roomId = req.params.roomId;

  Room.findOneAndDelete({ roomId: roomId })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Room not found",
          name: roomCategory,
        });
      } else {
        res.status(201).json({
          message: "Room deleted successfully",
          result: result,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Room deletion failed",
        error: err,
      });
    });
}
