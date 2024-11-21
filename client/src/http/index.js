import axios from "axios";
import NProgress from "@/plugins/nprogress";

// 创建 axios 实例
const http = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求计数器
let requestCount = 0;

// 显示加载进度条
function showProgress() {
  if (requestCount === 0) {
    NProgress.start();
  }
  requestCount++;
}

// 隐藏加载进度条
function hideProgress() {
  requestCount--;
  if (requestCount === 0) {
    NProgress.done();
  }
}

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    showProgress();
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    hideProgress();
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    hideProgress();
    return response.data;
  },
  (error) => {
    hideProgress();
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default http;
