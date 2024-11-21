require("dotenv").config(); // 加载.env环境变量，用于从.env文件中读取环境变量
const morgan = require("morgan"); // 引入morgan库，用于日志记录
const cors = require("cors"); // 引入cors库，用于处理跨源资源共享
const { verifyToken } = require("./authMiddleware"); // 引入验证Token的中间件
const authRoutes = require("./authRoutes"); // 引入认证相关的路由处理模块
const articlesRoutes = require("./articlesRoutes"); // 引入文章相关的路由处理模块

// 初始化中间件
function initializeMiddlewares() {
  app.use(morgan("combined")); // 使用 'combined' 预设格式记录所有请求
  app.use(express.json());
  app.use(cors());
}

// 设置路由
function setupRoutes() {
  app.use("/auth", authRoutes);
  app.use("/articles", verifyToken, articlesRoutes); // 使用文章路由
}

// 端口处理和服务器启动
function handlePortAndStartServer() {
  let port = process.env.PORT; // 初始端口号
  startServer(port);
}

function startServer(port) {
  app
    .listen(port, () => {
      console.log(`服务器在端口 ${port} 上运行`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        port = Number(port) + 1;
        console.log(`端口 ${port} 已被占用，尝试端口 ${port}`);
        startServer(port); // 递归调用，尝试下一个端口
      } else {
        console.error(err);
      }
    });
}

// 处理SIGINT信号，优雅关闭服务器
function setupGracefulShutdown() {
  process.on("SIGINT", () => {
    console.log("收到 SIGINT 信号，正在关闭服务器...");
    server.close(() => {
      console.log("服务器已关闭");
      process.exit(0);
    });
  });
}

// 执行初始化和启动流程
function initializeAndStart() {
  initializeMiddlewares();
  setupRoutes();
  handlePortAndStartServer();
  setupGracefulShutdown();
}

initializeAndStart(); // 启动服务器
