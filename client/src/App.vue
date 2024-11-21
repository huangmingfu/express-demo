<template>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// 可以在这里添加全局的登录状态管理
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}
</style>
