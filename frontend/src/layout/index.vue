<template>
  <div class="layout-container" :class="{'maximized': isMaximized, 'dark-mode': isDarkMode}">
    <TitleBar @toggle-maximize="toggleMaximize" @close="closeApp" @minimize="minimize" />

    <div class="content">
      <div class="window-controls">
        <button @click="toggleTheme" class="theme-toggle">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <div class="icon">
            <i :class="feature.icon"></i>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>

    <!-- 自定义边框元素 -->
    <div class="custom-border top"></div>
    <div class="custom-border right"></div>
    <div class="custom-border bottom"></div>
    <div class="custom-border left"></div>
  </div>
</template>

<script lang="ts" setup>
import TitleBar from "@/layout/titlebar/index.vue";
import {ref, onMounted, onUnmounted} from "vue";

let isMaximized = ref(false)
let isDarkMode = ref(true)

let features = ref([
  {
    title: "Frameless Design",
    description: "完全自定义的无边框窗口，提供现代化UI体验",
    icon: "fas fa-window-maximize"
  },
  {
    title: "Theme Switching",
    description: "支持亮色/暗色主题切换，满足不同用户偏好",
    icon: "fas fa-palette"
  },
  {
    title: "Responsive Layout",
    description: "自适应布局，确保在各种屏幕尺寸上完美显示",
    icon: "fas fa-mobile-alt"
  },
  {
    title: "Custom Borders",
    description: "可自定义的边框样式，提升视觉层次感",
    icon: "fas fa-border-all"
  },
  {
    title: "Native Integration",
    description: "与系统原生功能无缝集成，提供高性能体验",
    icon: "fas fa-plug"
  },
  {
    title: "Cross Platform",
    description: "支持Windows、macOS和Linux三大平台",
    icon: "fab fa-windows"
  }
])

// 检查窗口最大化状态
const checkMaximized = async () => {
  isMaximized.value = await window.runtime.WindowIsMaximised()
}

// 切换最大化状态
const toggleMaximize = async () => {
  if (await window.runtime.WindowIsMaximised()) {
    window.runtime.WindowUnmaximise()
  } else {
    window.runtime.WindowMaximise()
  }

  await checkMaximized()
}

// 最小化窗口
const minimize = () => {
  window.runtime.WindowMinimise()
}

// 关闭应用
const closeApp = () => {
  window.runtime.Quit()
};

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

// 初始化
onMounted(async () => {
  await checkMaximized();

  // 监听窗口大小变化
  window.runtime.Events.On("window:resized", checkMaximized)
})

onUnmounted(() => {
  window.runtime.Events.Off("window:resized");
})
</script>

<style lang="scss" scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.layout-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: $bg-dark;
  color: $text-dark;
  display: flex;
  flex-direction: column;

  z-index: 1;

  &.dark-mode {
    background-color: $bg-dark;
    color: $text-dark;
  }

  &:not(.dark-mode) {
    background-color: $bg-light;
    color: $text-light;
  }

  &.maximized {
    .custom-border {
      display: none;
    }
  }
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.window-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.theme-toggle {
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #825ee4;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  i {
    font-size: 1.2rem;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-card {
  background: var(--card-bg-dark);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  .dark-mode & {
    background: var(--card-bg-dark);
  }

  &:not(.dark-mode) & {
    background: var(--card-bg-light);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(94, 114, 228, 0.3);
    border: 1px solid var(--accent);
  }

  .icon {
    width: 60px;
    height: 60px;
    background: rgba(94, 114, 228, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    i {
      font-size: 24px;
      color: var(--accent);
    }
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: var(--accent);
  }

  p {
    line-height: 1.6;
    color: inherit;
    opacity: 0.9;
  }
}

.custom-border {
  position: absolute;
  background: var(--border-color);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: var(--border-hover-color);
  }

  &:active {
    background: var(--border-active-color);
  }

  &.top {
    top: 0;
    left: 10px;
    right: 10px;
    height: var(--border-width);
    cursor: ns-resize;
  }

  &.right {
    top: 10px;
    right: 0;
    bottom: 10px;
    width: var(--border-width);
    cursor: ew-resize;
  }

  &.bottom {
    bottom: 0;
    left: 10px;
    right: 10px;
    height: var(--border-width);
    cursor: ns-resize;
  }

  &.left {
    top: 10px;
    left: 0;
    bottom: 10px;
    width: var(--border-width);
    cursor: ew-resize;
  }
}
</style>
