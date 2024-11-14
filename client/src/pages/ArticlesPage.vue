<template>
  <div>
    <button @click="fetchArticles">加载文章</button>
    <button @click="createArticle">创建文章</button>
    <button @click="getArticleById">根据ID获取文章</button>
  </div>
  <div>
    <!-- <h1>Articles文章模块</h1> -->
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  apiGetArticles,
  apiCreateArticle,
  apiGetArticleById,
} from "@/http/api";

const articles = ref([]);

const fetchArticles = async () => {
  try {
    const response = await apiGetArticles();
    if (response.code === 200) {
      articles.value = response.data;
    } else {
      console.error("Error fetching articles:", response.message);
    }
  } catch (error) {
    console.error("Network or other error:", error);
  }
};

const createArticle = async () => {
  await apiCreateArticle("New Article", "Content of the new article");
};

const getArticleById = async () => {
  await apiGetArticleById(2);
};
</script>
