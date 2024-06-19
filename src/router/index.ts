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
    path: '/generator/:pageId?',
    name: 'generator',
    component: () =>
      import(
        /* webpackChunkName: "generator" */ '../design/pages/generator/index.vue'
      )
  },
  {
    path: '/work-flow',
    name: 'workFlow',
    component: () =>
      import(
        /* webpackChunkName: "generator" */ '../design/pages/work-flow/index.vue'
      )
  }
]

export default routes
