<template>
  <div v-if="node" class="ep-node-drawer-container">
    <ElDrawer
      v-model="isShow"
      title="节点设置"
      icon="setting"
      width="600px"
      append-to-body
    >
      <template #default>
        <component
          :is="drawerComponents[ node.nodeType ]"
          :config="node.config"
        />
      </template>
      <template #footer>
        <ElButton @click="cancelUpdateConfig">取消</ElButton>
        <ElButton type="primary" @click="updateConfig">确定</ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
<script setup name="BaseDrawer">
// import Button from '@/components/Button/Button'
import { ref, shallowRef, getCurrentInstance, defineAsyncComponent } from 'vue'
import { nodeConfig } from '../../config/nodeConfig'
import { copy, loadDrawerComp } from '../../utils/tools'

const props = defineProps({})

const { proxy } = getCurrentInstance()

// 节点数据的副本
const node = ref(null)
// 节点配置数据
const config = ref(null)
// 是否显示配置界面
const isShow = ref(false)

// 加载节点抽屉组件

const drawerComponents = shallowRef({})
// loadDrawerComp()
const modules = require.context('../', true, /.*\/.*Drawer\.vue$/)

const loadComponent = async (key) => {
  if (nodeConfig[key] && nodeConfig[key].hasDrawer) {
    try {
      const modulePath = `./${key}/${key}Drawer.vue`

      drawerComponents.value[key] = modules(modulePath).default
      console.log('drawerComponents: ', drawerComponents)
    } catch (error) {
      console.error(`Failed to load component for ${key}: `, error)
    }
  }
}

// 初始化加载所有组件
Object.keys(nodeConfig).forEach((key) => loadComponent(key))

// Object.keys(nodeConfig).forEach(key => {
//   let item = nodeConfig[key]
//   if(item.hasDrawer) {
//     let component = defineAsyncComponent(modules[`../${key}/${key}Drawer.vue`])
//     drawerComponents.value[key] = component
//   }
// })

// 显示节点配置组件
const show = (data) => {
  // 复制数据
  node.value = copy(data)
  config.value = nodeConfig[node.value.nodeType]

  isShow.value = true
}

const emit = defineEmits(['updateConfig', 'cancelUpdateConfig'])

// 更新节点配置数据
const updateConfig = () => {
  isShow.value = false
  emit('updateConfig', copy(node.value.config))
}

// 取消更新节点配置数据
const cancelUpdateConfig = () => {
  isShow.value = false
  emit('cancelUpdateConfig')
}

defineExpose({
  show
})
</script>

<style scoped>
.ep-node-drawer {
}
</style>
