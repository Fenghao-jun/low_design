import './public-path'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import btn from '@/directive/btn'
import routes from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/main.scss'
import { createPinia } from 'pinia'
// import { usePermission } from 'am-admin-hooks'

// const { provideAuthButton, setGlobalState } = usePermission()

// setGlobalState?.()
// import VueTinymce from '@packy-tang/vue-tinymce'

let router: any = null
let instance: any = null
let history: any = null

function render(props: any | undefined) {
  const container = props ? props.container : undefined
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/design' : '/')
  router = createRouter({
    history,
    routes
  })

  instance = createApp(App)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    instance.component(key, component)
  }

  // instance.use(VueTinymce)

  instance.use(btn)
  instance.use(ElementPlus, { locale })
  instance.use(router)
  instance.use(createPinia())
  instance.mount(container ? container.querySelector('#app') : '#app')

  // 遍历require.context的返回模块，并导入
  const requireAll = (requireContext) =>
    requireContext.keys().map(requireContext)

  // import所有符合条件的svg 三个参数：文件夹、是否使用子文件夹、正则
  const req = require.context('@/assets/icons/svg', true, /\.svg$/)
  requireAll(req)
}

if (!window.__POWERED_BY_QIANKUN__) {
  render(undefined)
}

export async function bootstrap() {
  // console.log('%c%s', 'color: green;', 'vue3.0 app bootstraped');
}

export async function mount(props: any) {
  render(props)
  // provideAuthButton(instance, props)
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  router = null
  history.destroy()
}
