import http from "./index";

export function apiGetArticles() {
  return http.get("/articles");
}

export function apiCreateArticle(title, content) {
  return http.post("/articles/create", { title, content });
}

export function apiGetArticleById(id) {
  return http.get(`/articles/get?id=${id}`);
}
