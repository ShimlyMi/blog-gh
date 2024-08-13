import { createApp } from 'vue'
import Antd from 'ant-design-vue';

import App from './App.vue'

// 引入样式
import './style.css'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(Antd).mount('#app')
