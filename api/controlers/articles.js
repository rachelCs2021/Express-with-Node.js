const mongoose = require("mongoose");
const Article = require("../models/articles");
const Category = require("../models/categories");

module.exports = {
  getAllArticles: (req, res) => {
    Article.find()
      .populate("categoryId")
      .then((articles) => {
        res.status(200).json({
          articles,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  getArticle: (req, res) => {
    const articleId = req.params.articleId;

    Article.findById(articleId)
      .then((article) => {
        res.status(200).json({
          article,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  createNewArticle: (req, res) => {
    const { title, description, content, categoryId } = req.body;

    Category.findById(categoryId)
      .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: "Category Not Found",
          });
        }

        const article = new Article({
          _id: new mongoose.Types.ObjectId(),
          title,
          description,
          content,
          categoryId,
        });
        return article.save();
      })
      .then(() => {
        res.status(200).json({
          message: "CREATED A NEW ARTICLES",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  },
  updateArticle: (req, res) => {
    const articleId = req.params.articleId;
    const { categoryId } = req.body;

    Article.findById(articleId)
      .then((article) => {
        if (!article) {
          return res.status(404).json({
            message: "Article Not Found",
          });
        }
      })
      .then(() => {
        if (categoryId) {
          return Category.findById(categoryId)
            .then((category) => {
              if (!category) {
                return res.status(404).json({
                  message: "Category Not Found",
                });
              }

              // (element to update, the update)
              return Article.updateOne({ _id: articleId }, req.body);
            })
            .then(() => {
              res.status(200).json({
                message: `UPDATE ARTICLE - ${articleId}`,
              });
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
            });
        }
      });
  },
  deleteArticle: (req, res) => {
    const articleId = req.params.articleId;

    Article.findById(articleId)
      .then((article) => {
        if (!article) {
          return res.status(404).json({
            message: "Category Not Found",
          });
        }
      })
      .then(() => {
        Article.deleteOne({ _id: articleId })
          .then(() => {
            res.status(200).json({
              message: `DELETE ARTICLE - ${articleId}`,
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
