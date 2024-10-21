import express from "express";
import {
  createGalleryItem,
  getGalleryItem,
} from "../controllers/GalleryItemController.js";

const galleryRouter = express.Router();

galleryRouter.post("/", createGalleryItem);
galleryRouter.get("/", getGalleryItem);

export default galleryRouter;
