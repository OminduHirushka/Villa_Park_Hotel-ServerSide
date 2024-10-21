import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryByName,
} from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategory);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.delete("/:name", deleteCategory);

export default categoryRouter;
