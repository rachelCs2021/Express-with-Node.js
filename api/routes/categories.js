const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controlers/categories");

router.get("/", getAllCategories);

router.post("/", createNewCategory);

router.patch("/:categoryId", updateCategory);

router.delete("/:categoryId", deleteCategory);

module.exports = router;
