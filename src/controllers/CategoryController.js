import Category from "../models/Category.js";
import { isAdminValid } from "./UserController.js";

export function createCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const category = req.body;

  const newCategory = new Category(category);
  newCategory
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Category created successfully",
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

export function updateCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const categoryName = req.params.name;
  const updatedCategory = req.body;

  Category.findOneAndUpdate({ name: categoryName }, updatedCategory)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Category not found",
          name: categoryName,
        });
      } else {
        res.status(201).json({
          message: "Successfull",
          result: updatedCategory,
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

export function getCategory(req, res) {
  Category.find()
    .then((result) => {
      res.status(201).json({
        message: "Successfull",
        categories: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed",
        error: err,
      });
    });
}

export function getCategoryByName(req, res) {
  const categoryName = req.params.name;

  Category.findOne({ name: categoryName })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Category not found",
          name: categoryName,
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

export function deleteCategory(req, res) {
  if (!isAdminValid(req)) {
    res.status(403).json({
      message: "Not Authorized",
    });
    return;
  }

  const categoryName = req.params.name;

  Category.findOneAndDelete({ name: categoryName })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: "Category not found",
          name: categoryName,
        });
      } else {
        res.status(201).json({
          message: "Category deleted successfully",
          name: categoryName,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Category deletion failed",
        error: err,
      });
    });
}
