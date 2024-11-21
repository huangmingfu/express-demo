import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/plugins/nprogress";
import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ArticlesPage from "../pages/ArticlesPage.vue";
import NotFoundPage from "@/components/NotFoundPage.vue";
import UnauthorizedPage from "@/components/UnauthorizedPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/articles",
    name: "Articles",
    component: ArticlesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/403",
    name: "Unauthorized",
    component: UnauthorizedPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开始进度条
  const token = localStorage.getItem("token");

  // 重定向到未授权页面，并保存原目标路径
  if (to.meta.requiresAuth && !token) {
    next({
      path: "/403",
      query: { redirect: to.fullPath },
    });
  } else if (to.path === "/login" && token) {
    next("/articles");
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束进度条
});

// 路由错误处理
router.onError(() => {
  NProgress.done(); // 确保在路由错误时也能结束进度条
});

export default router;
