# Vue 3 + JavaScript + Vite 项目文档

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- Vue Router - 官方路由管理器
- Axios - HTTP 客户端
- Less - CSS 预处理器
- NProgress - 进度条组件
- Tailwind CSS - 原子化 CSS 框架

## 项目结构

```tree
src/
├── assets/          # 静态资源
│   └── tailwind.css # Tailwind 配置
├── components/      # 公共组件
│   ├── Loading.vue  # 全局加载组件
│   ├── NotFoundPage.vue    # 404页面
│   └── UnauthorizedPage.vue # 403页面
├── http/           # HTTP 相关
│   ├── api.js      # API 接口定义
│   └── index.js    # Axios 配置
├── pages/          # 页面组件
│   ├── HomePage.vue    # 首页
│   ├── LoginPage.vue   # 登录页
│   └── ArticlesPage.vue # 文章页
├── plugins/        # 插件配置
│   ├── nprogress.js     # 进度条配置
│   └── loadingManager.js # 加载状态管理
├── router/         # 路由配置
│   └── index.js    # 路由定义
├── styles/         # 样式文件
│   ├── variables.less # Less 变量
│   └── nprogress.less # 进度条样式
├── App.vue         # 根组件
└── main.js         # 入口文件
```

## 功能特性

### 1. 路由管理
- 基于 Vue Router 的路由系统
- 路由守卫实现权限控制
- 支持路由懒加载
- 404/403 页面处理

### 2. 请求处理
- Axios 封装
- 统一的接口管理
- 请求/响应拦截器
- Token 自动携带
- 401 状态处理

### 3. 加载状态
- 全局 Loading 组件
- NProgress 进度条
- 请求自动触发
- 并发请求处理

### 4. 样式管理
- Less 预处理器
- 全局变量复用
- 主题色统一
- 响应式设计

## 开发指南

### 环境准备
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 环境变量
在项目根目录创建 `.env` 文件：
```env
VITE_SERVER_URL=http://localhost:3000
```

### 新增页面
1. 在 `src/pages` 创建页面组件
2. 在 `router/index.js` 添加路由配置
3. 设置路由元信息 `meta`

### 添加接口
在 `src/http/api.js` 添加接口定义：
```javascript
export function newApi(params) {
  return http({
    method: 'get',
    url: '/path/to/api',
    params
  });
}
```

### 使用 Loading
```javascript
import loadingManager from '@/plugins/loadingManager';

// 显示加载
loadingManager.show('加载中...');

// 隐藏加载
loadingManager.hide();

// 重置状态
loadingManager.reset();
```

## 构建配置

### Vite 配置
- 路径别名
- 代理设置
- Less 配置
- 构建优化

### 代码分割
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'vue-router', 'axios']
      }
    }
  }
}
```

## 最佳实践

### 组件开发
- 使用组合式 API
- Props 类型检查
- 事件命名规范
- 组件命名规范

### 样式编写
- 使用 Less 变量
- 遵循 BEM 命名
- 响应式设计
- 避免深层嵌套

### 状态管理
- 合理使用 computed
- 响应式数据设计
- 组件通信规范
- 缓存策略

### 性能优化
- 路由懒加载
- 组件按需加载
- 合理的缓存策略
- 资源压缩优化

## 注意事项

1. 环境变量命名必须以 `VITE_` 开头
2. 生产环境需要正确配置 `VITE_SERVER_URL`
3. 注意处理 Token 过期情况
4. 合理使用 Loading 避免重复显示
5. 注意路由权限控制

## 常见问题

### 跨域处理
使用 Vite 的代理配置：
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### 路由权限
在路由守卫中处理：
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !hasToken()) {
    next('/login');
  } else {
    next();
  }
});
```

### 请求错误处理
在响应拦截器中统一处理：
```javascript
http.interceptors.response.use(
  response => response.data,
  error => {
    // 统一错误处理
    return Promise.reject(error);
  }
);
```
