const express = require("express");
const router = express.Router();
const articlesModel = require("./articlesModel");

// 获取所有文章
router.get("/", (req, res) => {
  const articles = articlesModel.getAllArticles();
  res
    .status(200)
    .json({ code: 200, message: "成功获取所有文章", data: articles });
});

// 根据ID获取单篇文章
router.get("/:id", (req, res) => {
  const article = articlesModel.getArticleById(parseInt(req.params.id));
  if (article) {
    res.status(200).json({ code: 200, message: "成功获取文章", data: article });
  } else {
    res.status(404).json({ code: 404, message: "文章未找到", data: null });
  }
});

// 创建新文章
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const newArticle = articlesModel.addArticle(title, content);
  res
    .status(200)
    .json({ code: 200, message: "文章创建成功", data: newArticle });
});

module.exports = router;
