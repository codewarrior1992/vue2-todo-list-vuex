import Vue from 'vue'
import VueRouter from 'vue-router'
import ListView from '../views/ListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListView
  },
  {
    path: '/:id',
    name: 'todo',
    component: () => import('../views/TodoView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
