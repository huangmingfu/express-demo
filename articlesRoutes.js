const express = require("express");
const router = express.Router();
const articlesModel = require("./articlesModel");

// 获取所有文章
router.get("/", (req, res) => {
  res.status(200).json(articlesModel.getAllArticles());
});

// 根据ID获取单篇文章
router.get("/:id", (req, res) => {
  const article = articlesModel.getArticleById(parseInt(req.params.id));
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).send("文章未找到");
  }
});

// 创建新文章
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newArticle = articlesModel.addArticle(title, content);
  res.status(201).send(newArticle);
});

module.exports = router;
