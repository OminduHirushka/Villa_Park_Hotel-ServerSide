import GalleryItem from "../models/GalleryItem.js";
import { isAdminValid } from "./UserController.js";

export function createGalleryItem(req, res) {
  const user = req.user;

  if (user == null) {
    res.status(403).json({
      message: "Please login to create a gallery item",
    });
    return;
  }

  if (user.type != "admin") {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const galleryItem = req.body;

  const newGalleryItem = new GalleryItem(galleryItem);
  newGalleryItem
    .save()
    .then(() => {
      res.json({
        message: "Gallery Item created successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Gallery Item creation failed",
      });
    });
}

export function getGalleryItem(req, res) {
  GalleryItem.find().then((list) => {
    res.json({
      message: "Successfull",
      list: list,
    });
  });
}

export function updateGalleryItem(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const galleryItemName = req.params.name;
  const updatedGallery = req.body;

  GalleryItem.findOneAndUpdate({ name: galleryItemName }, updatedGallery)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Gallery Item not found",
          name: galleryItemName,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: updatedGallery,
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

export function deleteGalleryItem(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const galleryItemName = req.params.name;

  GalleryItem.findOneAndDelete({ name: galleryItemName })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Gallery Item not found",
          name: galleryItemName,
        });
      } else {
        res.status(201).json({
          message: "Gallery Item deleted successfully",
          name: galleryItemName,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Gallery Item deletion failed",
        error: err,
      });
    });
}
