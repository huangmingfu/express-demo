import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    base: "./",
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/variables.less";`, // 全局变量文件
        },
      },
    },
    build: {
      target: "es2015",
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js", // chunk包输出的文件夹名称
          entryFileNames: "js/[name]-[hash].js", // 入口文件输出的文件夹名称
          assetFileNames: "[ext]/[name]-[hash].[ext]", // 静态文件输出的文件夹名称
          manualChunks: {
            vendor: ["vue", "vue-router", "axios"],
          },
        },
      },
    },
  });
};
