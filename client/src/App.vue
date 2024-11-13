<script setup>
import { ref } from "vue";
import { apiGetArticles } from "@/http/api";

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
</script>

<template>
  <div id="app">
    <button @click="fetchArticles">加载文章</button>
    <div v-for="article in articles" :key="article.id">
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
    </div>
  </div>
</template>
