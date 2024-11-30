import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/styles/nprogress.less";
import "./assets/tailwind.css";
import Loading from "@/components/Loading.vue";
import loadingManager from "@/plugins/loadingManager";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

// 创建 Loading 组件实例
const loading = createApp(Loading).mount(
  (() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    return div;
  })()
);

// 设置 loading 实例到管理器
loadingManager.setLoadingInstance(loading);

app.use(router);
app.use(ElementPlus);
app.mount("#app");
