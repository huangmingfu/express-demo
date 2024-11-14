const express = require("express");
const app = express();
const articlesRoutes = require("./articlesRoutes"); // 引入文章路由模块

app.use(express.json());
app.use("/articles", articlesRoutes); // 使用文章路由

let port = process.env.PORT || 3000; // 初始端口号

function startServer(port) {
  app
    .listen(port, () => {
      console.log(`服务器在端口 ${port} 上运行`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // 检查端口是否被占用
        console.log(`端口 ${port} 已被占用，尝试端口 ${port + 1}`);
        startServer(++port); // 递归调用，尝试下一个端口
      } else {
        console.error(err);
      }
    });
}

startServer(port); // 启动服务器
