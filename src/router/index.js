// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'
import AddPortfolioView from '../views/AddPortfolioView.vue'

const routes = [
  {
    path: '/',
    name: 'Portfolio',
    component: PortfolioView
  },
  {
    path: '/add',
    name: 'AddPortfolio',
    component: AddPortfolioView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router