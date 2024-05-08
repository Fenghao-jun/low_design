import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pageId?/:id?',
    name: 'design',
    component: () =>
      import(
        /* webpackChunkName: "design" */ '../design/pages/design/index.vue'
      )
  },
  {
    path: '/generator',
    name: 'generator',
    component: () =>
      import(
        /* webpackChunkName: "generator" */ '../design/pages/generator/index.vue'
      )
  }
]

export default routes
