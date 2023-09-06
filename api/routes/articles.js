const express = require("express");
const router = express.Router();

const {
  getAllArticles,
  getArticle,
  createNewArticle,
  updateArticle,
  deleteArticle,
} = require("../controlers/articles");

router.get("/", getAllArticles);

router.get("/:articleId", getArticle);

router.post("/", createNewArticle);

router.patch("/:articleId", updateArticle);

router.delete("/:articleId", deleteArticle);

module.exports = router;
