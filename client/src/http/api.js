import http from "./index";

export const login = (data) => {
  return http.post("/auth/login", data);
};

export const register = (data) => {
  return http.post("/auth/register", data);
};

export const apiGetArticles = () => {
  return http.get("/articles");
};

export function apiCreateArticle(title, content) {
  return http.post("/articles/create", { title, content });
}

export function apiGetArticleById(id) {
  // 以下写法，express里面都是从query里面获取
  // return http.get(`/articles/get?id=${id}`);
  // return http.get(`/articles/get`, { params: { id } });
  return http({
    method: "get",
    url: "/articles/get",
    params: { id },
  });
}
