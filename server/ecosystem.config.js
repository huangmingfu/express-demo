module.exports = {
  apps: [
    {
      name: "express-demo", // 应用名称
      script: "./app.js", // 启动脚本文件
      instances: 1, // 应用实例数量
      autorestart: true, // 自动重启
      watch: true, // 启用监听文件变化重启
      ignore_watch: ["node_modules", "logs", "*.log", "articles.json"], // 忽略监听的文件或文件夹
      watch_options: {
        followSymlinks: false, // 不跟踪符号链接
        usePolling: true, // 使用轮询方式检查文件变化
      },
      max_memory_restart: "1G", // 最大内存限制，超过自动重启
      env: {
        NODE_ENV: "development", // 开发环境变量
      },
      env_production: {
        NODE_ENV: "production", // 生产环境变量
        watch: false, // 生产环境关闭文件监听
      },
      output: "./logs/out.log", // 标准输出日志文件
      error: "./logs/error.log", // 错误日志文件
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 日志时间格式
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true, // 合并集群的日志
      log_type: "json",
      out_file: "/dev/stdout", // 输出到标准输出
      error_file: "/dev/stderr", // 错误输出到标准错误
    },
  ],
};
