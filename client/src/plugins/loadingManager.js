import NProgress from "./nprogress";

class LoadingManager {
  constructor() {
    this.requestCount = 0;
    this.loadingInstance = null;
  }

  // 设置 loading 实例
  setLoadingInstance(instance) {
    this.loadingInstance = instance;
  }

  // 显示加载状态
  show(msg) {
    if (this.requestCount === 0) {
      NProgress.start();
      if (this.loadingInstance) {
        this.loadingInstance.show(msg);
      }
    }
    this.requestCount++;
  }

  // 隐藏加载状态
  hide() {
    this.requestCount--;
    if (this.requestCount === 0) {
      NProgress.done();
      if (this.loadingInstance) {
        this.loadingInstance.hide();
      }
    }
  }

  // 强制重置状态
  reset() {
    this.requestCount = 0;
    NProgress.done();
    if (this.loadingInstance) {
      this.loadingInstance.hide();
    }
  }
}

export default new LoadingManager();
