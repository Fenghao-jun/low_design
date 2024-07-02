<template>
  <div v-if="node" class="ep-node-drawer-container">
    <ElDrawer
      v-model="isShow"
      icon="setting"
      title="节点设置"
      size="38%"
      append-to-body
    >
      <template #default>
        <CustomForm
          ref="formRef"
          :from-items="useEditFormItem"
          v-model="formData"
          label-width="130"
          :itemStyle="{
            padding: 0
          }"
          label-position="top"
          :col-layout="{
            xl: 24,
            lg: 24,
            md: 24,
            sm: 24,
            xs: 24
          }"
        >
          <template #launch> </template>
        </CustomForm>
        <component
          :is="drawerComponents[node.nodeType]"
          :config="node.config"
          :formData="formData"
        />
      </template>
      <template #footer>
        <ElButton @click="cancelUpdateConfig">取消</ElButton>
        <ElButton type="primary" @click="updateConfig">确定</ElButton>
      </template>
    </ElDrawer>
  </div>
</template>
<script lang="ts" setup name="BaseDrawer">
// import Button from '@/components/Button/Button'
import { ref, shallowRef } from 'vue'
import { BaseNodeConfig, nodeConfig } from '../../config/nodeConfig'
import { copy } from '../../utils/tools'
import { useEditForm } from '../../config/formConfig'
import { CustomForm } from 'am-admin-component'
import { getDesignTemplateList } from '@editor/api/workFlow'

const props = defineProps({})

// 节点数据的副本
const node = ref()
// 节点配置数据
const config = ref<BaseNodeConfig>()
// 是否显示配置界面
const isShow = ref(false)

const formData = ref({
  name: '',
  type: '',
  launch: ''
})
const templateList = ref([])
const templateListRequest = async () => {
  const res = await getDesignTemplateList()
  console.log('res: ', res)
  templateList.value = res.data
}

templateListRequest()

const { useEditFormItem } = useEditForm(formData, templateList)
// 加载节点抽屉组件

const drawerComponents = shallowRef({})
const modules = require.context('../', true, /.*\/.*Drawer\.vue$/)

const loadComponent = async (key) => {
  if (nodeConfig[key] && nodeConfig[key].hasDrawer) {
    try {
      const modulePath = `./${key}/${key}Drawer.vue`

      drawerComponents.value[key] = modules(modulePath).default
    } catch (error) {
      console.error(`Failed to load component for ${key}: `, error)
    }
  }
}

// 初始化加载所有组件
Object.keys(nodeConfig).forEach((key) => loadComponent(key))

// 显示节点配置组件
const show = (data) => {
  console.log('data: ', data)
  // 复制数据
  formData.value = copy(data.config)
  node.value = copy(data)
  config.value = nodeConfig[node.value.nodeType]
  console.log('nodeConfig: ', nodeConfig)

  isShow.value = true
}

const emit = defineEmits(['updateConfig', 'cancelUpdateConfig'])

// 更新节点配置数据
const updateConfig = () => {
  isShow.value = false
  emit('updateConfig', copy(formData.value))
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

<style lang="scss" scoped></style>
