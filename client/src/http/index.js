import axios from "axios";
import loadingManager from "@/plugins/loadingManager";

// 创建axios实例，设置基础URL和超时时间
const http = axios.create({
  baseURL: "/api", // API的基础URL
  timeout: 5000, // 请求超时时间
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
  },
});

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    loadingManager.show(); // 显示加载状态
    const token = localStorage.getItem("token"); // 从localStorage获取token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 如果token存在，添加到请求头
    }
    return config; // 返回配置
  },
  (error) => {
    loadingManager.hide(); // 隐藏加载状态
    return Promise.reject(error); // 返回错误
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    loadingManager.hide(); // 隐藏加载状态
    return response.data; // 返回响应数据
  },
  (error) => {
    loadingManager.hide(); // 隐藏加载状态
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // 如果401错误，移除token
      window.location.href = "/login"; // 重定向到登录页面
    }
    return Promise.reject(error.response?.data || error); // 返回错误
  }
);

export default http; // 导出http模块
