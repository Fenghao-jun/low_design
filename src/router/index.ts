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
    path: '/work-flow/:id?',
    name: 'workFlow',
    component: () =>
      import(
        /* webpackChunkName: "featureFlow" */ '../design/pages/work-flow/featureFlow/index.vue'
      )
  }
]

export default routes
