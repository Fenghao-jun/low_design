<template>
  <div class="node-row">
    发起对象：

    <div class="node-row_content">
      <div v-if="userNum">{{ userNum }}</div>
      <div v-if="departNum">{{ departNum }}</div>
    </div>
    <el-icon><ArrowRight /></el-icon>
  </div>
</template>

<script lang="ts" setup name="StartNode">
import { computed, getCurrentInstance, inject } from 'vue'
import { KEY_PROCESS_DATA, KEY_VALIDATOR } from '../../config/keys'
import { Validator } from '@editor/work-flow/components/Process/utils/validator'

const props = defineProps({
  tempNodeId: {
    // 临时节点ID
    type: String
  },
  node: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  }
})

const userNum = computed(() => {
  const userId = props.node.config?.userId?.length || 0
  // const customId = props.node.config?.customId?.length || 0
  const num = userId
  return num ? `人员：${num}人 ` : ''
})

const departNum = computed(() => {
  return props.node.config.departId
    ? `部门：${props.node.config.departId.length}个`
    : ''
})

// 获取流程验证器实例
const validator = inject<Validator>(KEY_VALIDATOR)

// 注册验证器
validator?.register(props.tempNodeId || '', () => {
  let valid = false
  let message = ''
  if (!userNum.value && !departNum.value) {
    message = '请选择发起对象'
  } else if (!props.node.config.name) {
    message = '请输入节点标题'
  } else {
    valid = true
  }

  console.log(valid, message, 'hhhh')

  return {
    valid,
    message
  }
})
</script>

<style lang="scss" scoped>
.node-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
