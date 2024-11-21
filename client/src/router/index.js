import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import ArticlesPage from "../pages/ArticlesPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import UnauthorizedPage from "../pages/UnauthorizedPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
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
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    // 重定向到未授权页面，并保存原目标路径
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

export default router;
