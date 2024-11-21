import axios from "axios";

// 创建 axios 实例
const http = axios.create({
  baseURL: "/api", // 确保这里的 baseURL 是 '/api'
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    console.log(`响应拦截器response -->`, response);
    // 2xx 范围内的http状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    console.log(`响应拦截器error -->`, error);
    // 超出 2xx 范围的http状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
