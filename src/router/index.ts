import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'design',
    component: () => import(/* webpackChunkName: "design" */ '../views/design/index.vue')
  },
  {
    path: '/generator',
    name: 'generator',
    component: () => import(/* webpackChunkName: "generator" */ '../views/generator/index.vue')
  }
]

export default routes
