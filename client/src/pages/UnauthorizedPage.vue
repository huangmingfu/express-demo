<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <h1>403</h1>
      <h2>访问被拒绝</h2>
      <p>抱歉，您没有权限访问此页面</p>
      <div class="action-links">
        <router-link to="/login" class="action-link login">
          去登录
        </router-link>
        <router-link to="/" class="action-link home"> 返回首页 </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unauthorized-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.unauthorized-content {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  color: #ff9800;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 2rem;
  color: #333;
  margin: 1rem 0;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.action-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-link.login {
  background-color: #ff9800;
  color: white;
}

.action-link.login:hover {
  background-color: #f57c00;
}

.action-link.home {
  background-color: #4caf50;
  color: white;
}

.action-link.home:hover {
  background-color: #45a049;
}
</style>
