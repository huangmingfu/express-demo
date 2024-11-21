<template>
  <div class="home-container">
    <header class="header">
      <h1>Express Demo</h1>
      <p class="subtitle">一个前后端分离的文章管理系统</p>
    </header>

    <main class="main-content">
      <div class="feature-grid">
        <div class="feature-card">
          <h3>🚀 前后端分离</h3>
          <p>基于 Vue3 + Express 的现代化架构</p>
        </div>
        <div class="feature-card">
          <h3>📝 文章管理</h3>
          <p>支持文章的增删改查操作</p>
        </div>
        <div class="feature-card">
          <h3>🛡 用户认证</h3>
          <p>JWT token 认证机制</p>
        </div>
        <div class="feature-card">
          <h3>🔥 开发体验</h3>
          <p>支持热重载，开发更高效</p>
        </div>
      </div>

      <div class="action-buttons">
        <router-link v-if="!isLoggedIn" to="/login" class="btn btn-primary">
          立即登录
        </router-link>
        <router-link v-else to="/articles" class="btn btn-primary">
          进入系统
        </router-link>
        <a href="https://github.com" target="_blank" class="btn btn-secondary">
          GitHub
        </a>
      </div>
    </main>

    <footer class="footer">
      <p>© 2024 Express Demo. MIT Licensed.</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";

const isLoggedIn = computed(() => {
  return !!localStorage.getItem("token");
});
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #4caf50;
  color: white;
}

.btn-primary:hover {
  background: #45a049;
}

.btn-secondary {
  background: #2c3e50;
  color: white;
}

.btn-secondary:hover {
  background: #34495e;
}

.footer {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    text-align: center;
  }
}
</style>
