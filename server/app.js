const express = require("express");
const app = express();
const articlesRoutes = require("./articlesRoutes"); // 引入文章路由模块

app.use(express.json());
app.use("/articles", articlesRoutes); // 使用文章路由

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
