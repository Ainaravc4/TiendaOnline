import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/carrito.vue'),
    meta: { requiresAuth: true}
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/panel.vue'),
    meta: { requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

export default router
