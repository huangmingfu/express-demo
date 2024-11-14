require("dotenv").config(); // 加载.env环境变量

const express = require("express");
const app = express();
const articlesRoutes = require("./articlesRoutes"); // 引入文章路由模块

app.use(express.json());
app.use("/articles", articlesRoutes); // 使用文章路由

// 如果不指定端口号，服务器将无法启动
// 生产环境：可以使用环境变量来控制端口号，这样部署时可以灵活配置。
//如果需要使用标准端口（80 或 443），通常会在前端有一个反向代理（如 Nginx 或 Apache），它监听标准端口并将请求转发到 Node.js 应用的非标准端口。
let port = process.env.PORT; // 初始端口号

function startServer(port) {
  app
    .listen(port, () => {
      console.log(`服务器在端口 ${port} 上运行`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        // 检查端口是否被占用
        console.log(`端口 ${port} 已被占用，尝试端口 ${Number(port) + 1}`);
        startServer(Number(port) + 1); // 递归调用，尝试下一个端口
      } else {
        console.error(err);
      }
    });
}

startServer(port); // 启动服务器
