// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import scrollRevealDirective from './directives/scroll-reveal'

const app = createApp(App)

app.use(router)
app.directive('scroll-reveal', scrollRevealDirective)
app.mount('#app')