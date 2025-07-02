<template>
  <div class="title-bar" :class="{'maximized': isMaximized}">
    <div class="title-area" @dblclick="toggleMaximize">
      <i class="fab fa-windows logo"></i>
      <h1 class="title" style="padding-top: 25px">Campanula Shell</h1>
    </div>

    <div class="window-controls">
      <button class="control-btn minimize" @click="minimize">
        <i class="fas fa-minus"></i>
      </button>
      <button class="control-btn maximize" @click="toggleMaximize">
        <i :class="isMaximized ? 'fas fa-window-restore' : 'fas fa-square'"></i>
      </button>
      <button class="control-btn close" @click="close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['toggle-maximize', 'close', 'minimize']);
const isMaximized = ref(false);

const toggleMaximize = async () => {
  isMaximized.value = !isMaximized.value;
  emit('toggle-maximize');
};

const minimize = () => {
  emit('minimize');
};

const close = () => {
  emit('close');
};
</script>

<style lang="scss">
.title-bar {
  height: $titlebar-height;
  background-color: $titlebar-bg;
  color: $titlebar-text;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  // 拖动区域
  -webkit-app-region: drag;

  // 防止文字选中
  user-select: none;

  // 层级管理
  position: relative;
  z-index: 1001;

  .title-area {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 0 10px;
    border-radius: 4px;

    // 防止文字选中
    user-select: none;

    .logo {
      font-size: 1.4rem;
      color: var(--accent);
    }

    .title {
      font-size: 1.1rem;
      font-weight: 500;

      // 防止文字选中
      user-select: none;
    }
  }

  .window-controls {
    display: flex;
    height: 100%;

    // 取消拖动区域
    -webkit-app-region: no-drag;

    .control-btn {
      height: 100%;
      width: 46px;
      background: transparent;
      border: none;
      color: var(--titlebar-text);
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      // 防止文字选中
      user-select: none;

      // 取消拖动区域
      -webkit-app-region: no-drag;

      // 按钮悬停效果
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
        opacity: 0.9;
      }

      // 最小化按钮
      &.minimize:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      // 最大化按钮
      &.maximize:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      // 关闭按钮
      &.close:hover {
        background: #e81123;
      }
    }
  }
}
</style>