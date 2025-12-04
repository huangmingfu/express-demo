import express from "express";
import cors from "cors";
import uploadRouter from "./router/upload.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 防止跨域问题
app.use(cors());
// 使用中间件解析JSON格式的请求体
app.use(express.json());

// 使用中间件解析URL编码的请求体，设置extended为false表示使用内置的querystring库解析
app.use(express.urlencoded({extended: false}));


// 静态文件托管
app.use('/uploads', express.static('uploads'));
// 设置路由
app.use('/upload', uploadRouter);


// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: '错误',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 监听端口
app.listen(PORT, () => {
  console.log(`服务已经启动： http://localhost:${PORT}`);
});

