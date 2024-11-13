const fs = require("fs");
const path = require("path");

// 定义存储数据的文件路径
const DATA_FILE = path.join(__dirname, "articles.json");

// 从文件中读取文章数据
function loadArticles() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("读取文章数据失败:", error);
    return []; // 如果读取失败，返回空数组
  }
}

// 将文章数据写入文件
function saveArticles(articles) {
  try {
    const data = JSON.stringify(articles, null, 2);
    fs.writeFileSync(DATA_FILE, data, "utf8");
  } catch (error) {
    console.error("保存文章数据失败:", error);
  }
}

let articles = loadArticles();

// 获取所有文章
function getAllArticles() {
  return articles;
}

// 根据ID获取文章
function getArticleById(id) {
  return articles.find((article) => article.id === id);
}

// 添加新文章
function addArticle(title, content) {
  // 查找当前最大的 ID
  const maxId = articles.reduce(
    (max, article) => (article.id > max ? article.id : max),
    0
  );
  const newArticle = {
    id: maxId + 1, // 使用最大 ID + 1
    title: title,
    content: content,
  };
  articles.push(newArticle);
  saveArticles(articles); // 更新文件中的数据
  console.log("新文章已添加:", newArticle); // 添加日志输出
  return newArticle;
}

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
};
