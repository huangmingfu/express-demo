import axios from "axios";
import loadingManager from "@/plugins/loadingManager";
import { ElMessage } from "element-plus";

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
    const { code, message } = response.data || {};
    if (code === 200) {
      ElMessage({
        message: message || "操作成功！",
        type: "success",
      });
    } else {
      ElMessage.error(message);
    }
    return response.data; // 返回响应数据
  },
  (error) => {
    loadingManager.hide(); // 隐藏加载状态
    ElMessage.error(error.response?.data?.message || error);

    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // 如果401错误，移除token
      setTimeout(() => {
        window.location.href = "/login"; // 重定向到登录页面
      }, 200);
    }
    return Promise.reject(error.response?.data || error); // 返回错误
  }
);

export default http; // 导出http模块
