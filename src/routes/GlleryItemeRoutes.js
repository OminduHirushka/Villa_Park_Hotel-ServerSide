import express from "express";
import {
  createGalleryItem,
  getGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/GalleryItemController.js";

const galleryRouter = express.Router();

galleryRouter.post("/", createGalleryItem);
galleryRouter.get("/", getGalleryItem);
galleryRouter.put("/:name", updateGalleryItem);
galleryRouter.delete("/:name", deleteGalleryItem);

export default galleryRouter;
