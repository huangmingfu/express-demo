<template>
  <div v-if="visible" class="loading-mask">
    <div class="loading-spinner">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
      <div class="loading-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const text = ref("加载中...");

// 导出方法供外部调用
defineExpose({
  show(msg = "加载中...") {
    text.value = msg;
    visible.value = true;
  },
  hide() {
    visible.value = false;
  },
});
</script>

<style lang="less" scoped>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  .flex-center();
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  animation: rotate 2s linear infinite;
}

.path {
  stroke: @primary-color;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

.loading-text {
  margin-top: @spacing-sm;
  color: @text-color;
  font-size: 14px;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
