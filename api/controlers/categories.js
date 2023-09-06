const mongoose = require("mongoose");
const Category = require("../models/categories");

module.exports = {
  getAllCategories: (req, res) => {
    Category.find()
      .then((categories) => {
        res.status(200).json({
          categories,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    Category.findById(categoryId)
      .then((category) => {
        res.status(200).json({
          category,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createNewCategory: (req, res) => {
    const { title, description } = req.body;

    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
    });

    category
      .save()
      .then(() => {
        res.status(200).json({
          message: "CREATED A NEW CATEGORY",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateCategory: (req, res) => {
    const categoryId = req.params.categoryId;
    console.log("update", req.body);
    // (element to update, the update)

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category Not Found",
          });
        }
      })
      .then(() => {
        Category.updateOne({ _id: categoryId }, req.body)
          .then(() => {
            res.status(200).json({
              message: `UPDATE CATEGORY - ${categoryId}`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
  deleteCategory: (req, res) => {
    const categoryId = req.params.categoryId;

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category Not Found",
          });
        }
      })
      .then(() => {
        Category.deleteOne({ _id: categoryId })
          .then(() => {
            res.status(200).json({
              message: `DELETE CATEGORY - ${categoryId}`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error,
            });
          });
      });
  },
};
