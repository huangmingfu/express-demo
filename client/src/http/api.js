
import http from './index'

export function apiGetArticles() {
    return http.get('/articles')
}