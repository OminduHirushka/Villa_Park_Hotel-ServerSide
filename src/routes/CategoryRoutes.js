import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryByName,
  updateCategory,
} from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategory);
categoryRouter.put("/:name", updateCategory);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.delete("/:name", deleteCategory);

export default categoryRouter;
