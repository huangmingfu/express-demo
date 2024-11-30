<template>
  <div class="flex items-center gap-4">
    <button
      @click="fetchArticles"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      加载文章
    </button>
    <button
      @click="createArticle"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      创建文章
    </button>
    <button
      @click="getArticleById"
      class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      根据ID获取文章
    </button>
    <button
      @click="getArticleByIdError"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      根据ID获取文章（失败情况）
    </button>
    <button
      @click="logout"
      class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      退出登录
    </button>
  </div>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.id">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  apiGetArticles,
  apiCreateArticle,
  apiGetArticleById,
} from "@/http/api";

const router = useRouter();
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

const getArticleByIdError = async () => {
  await apiGetArticleById(99999);
};

// 退出登录
const logout = () => {
  localStorage.removeItem("token"); // 清除 token
  router.push("/");
};
</script>
