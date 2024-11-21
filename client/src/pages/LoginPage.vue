<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            required
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            required
            placeholder="请输入密码"
          />
        </div>
        <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
        <button type="submit" :disabled="loading">
          {{ loading ? "登录中..." : "登录" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { login } from "../http/api";

const router = useRouter();
const loading = ref(false);
const errorMsg = ref("");

const formData = reactive({
  username: "admin",
  password: "123456",
});

const handleLogin = async () => {
  try {
    loading.value = true;
    errorMsg.value = "";

    const res = await login(formData);

    // 保存 token
    localStorage.setItem("token", res.token);

    // 跳转到文章页
    router.push("/articles");
  } catch (error) {
    errorMsg.value = error.message || "登录失败，请重试";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4caf50;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #f44336;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
