const express = require("express");
const {
  getAllArticles,
  getArticleById,
  addArticle,
} = require("./articlesModel");

const router = express.Router();

// 添加一个通用的成功响应函数
function sendSuccessResponse(res, message, data) {
  res.json({ code: 200, message: message, data: data });
}

// 获取所有文章
router.get("/", (req, res) => {
  const articles = getAllArticles();
  sendSuccessResponse(res, "成功获取所有文章", articles);
});

// 根据 ID 获取单个文章
router.get("/get", (req, res) => {
  const article = getArticleById(parseInt(req.query.id));
  if (article) {
    sendSuccessResponse(res, "成功获取文章", article);
  } else {
    res.status(200).json({ code: 404, message: "文章未找到" });
  }
});

// 添加新文章
router.post("/create", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ code: 400, message: "标题和内容是必需的" });
  }
  const newArticle = addArticle(title, content);
  res
    .status(201)
    .json({ code: 201, message: "文章添加成功", data: newArticle });
});

module.exports = router;
