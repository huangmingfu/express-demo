// 初始化文章数据
let articles = [
  { id: 1, title: "第一篇文章", content: "这是第一篇文章的内容" },
  { id: 2, title: "第二篇文章", content: "这是第二篇文章的内容" },
];

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
  const newArticle = {
    id: articles.length + 1,
    title: title,
    content: content,
  };
  articles.push(newArticle);
  return newArticle;
}

module.exports = {
  getAllArticles,
  getArticleById,
  addArticle,
};
