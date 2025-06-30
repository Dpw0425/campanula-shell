import {createApp} from 'vue'
import App from './App.vue'

// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 配置 element-plus 国际化
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

// 挂载应用
app.mount('#app')
