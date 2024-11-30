# Express Demo 项目

这是一个使用 Express.js 构建的演示项目，实现了前后端分离架构的文章管理系统。

## 特性

- 🚀 前后端分离架构
- 📝 文章的增删改查功能
- 🔄 自动端口分配机制
- 🛡 PM2 进程管理和守护
- 🔥 开发环境热重载
- 🌍 环境变量配置
- 📦 JSON 文件数据持久化

## 技术栈

### 后端
- Express.js - Web 应用框架
- PM2 - Node.js 进程管理工具
- Nodemon - 开发环境热重载工具
- dotenv - 环境变量管理

### 前端
- Vue.js - 渐进式 JavaScript 框架
- Vite - 现代前端构建工具
- Axios - HTTP 客户端

## 项目结构

```tree
├── client/                 # 前端项目目录
│   ├── src/               
│   │   ├── http/         # API 请求封装
│   │   │   ├── api.js    # API 接口定义
│   │   │   └── index.js  # HTTP 客户端配置
│   │   ├── pages/        # 页面组件
│   │   │   └── ArticlesPage.vue  # 文章管理页面
│   │   └── App.vue       # 根组件
│   ├── index.html        # HTML 入口文件
│   └── vite.config.js    # Vite 配置文件
│
├── server/                # 后端项目目录
│   ├── app.js            # 应用入口文件
│   ├── articlesRoutes.js # 文章路由
│   ├── articlesModel.js  # 文章数据模型
│   ├── articles.json     # 文章数据存储
│   ├── ecosystem.config.js # PM2 配置文件
│   ├── nodemon.json      # Nodemon 配置文件
│   └── .env              # 环境变量配置
│
└── README.md             # 项目说明文档
```

## 快速开始

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0
- PM2 (全局安装)

### 1. 安装

```bash
# 克隆项目
git clone [项目地址]

# 安装依赖（根目录执行）
npm run install-all

# 全局安装 PM2
npm install pm2 -g
```

### 2. 配置

在 server 目录下创建 .env 文件：
```env
PORT=3000
```

### 3. 开发模式

```bash
# 启动后端服务（二选一）
cd server
npm run dev     # 使用 PM2 启动（支持热重载）
# 或
npm run old-dev # 使用 nodemon 启动

# 启动前端开发服务器
cd client
npm run dev
```

## PM2 管理命令

### 基础命令
```bash
npm run dev         # 开发环境启动（支持热重载）
npm run start      # 启动服务
npm run start:pro  # 生产环境启动
npm run stop       # 停止服务
npm run restart    # 重启服务
npm run monitor    # 打开监控面板
```


## 生产环境部署

### 1. 前端构建
```bash
cd client
npm run build
```

### 2. 后端部署
```bash
cd server
npm run start:pro
```

## 项目特点说明

### 自动端口分配
- 当配置的端口被占用时，系统会自动尝试下一个可用端口
- 适合多个服务共存的开发环境

### 数据持久化
- 使用 JSON 文件存储数据
- 支持文章的增删改查操作
- 适合小型应用和原型开发

### 开发体验
- 支持热重载，代码修改后自动重启
- 完整的日志系统，方便调试
- 灵活的环境配置

## 注意事项

- 确保 server/.env 文件不被提交到版本控制系统
- 生产环境部署时建议关闭文件监听功能
- 建议定期备份 articles.json 数据文件
- 大规模部署时建议使用数据库替代 JSON 文件存储

## 许可证

[MIT License](LICENSE)