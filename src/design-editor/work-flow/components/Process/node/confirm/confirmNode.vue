<template>
  <!-- 确认人节点 -->
  <div class="node-row">
    确认对象：

    <div class="node-row_content">
      <div v-if="userNum">{{ userNum }}</div>
      <div v-if="departNum">{{ departNum }}</div>
    </div>
    <el-icon><ArrowRight /></el-icon>
  </div>
</template>

<script lang="ts" setup name="ApproverNode">
import { computed, inject } from 'vue'
import { KEY_VALIDATOR, KEY_PROCESS_DATA } from '../../config/keys'
import { Validator } from '../../utils/validator'
import { DefaultNode } from '../../config/nodeConfig'
import { useSelectObject } from '@editor/work-flow/components/Process/hooks/useSelectObject'

interface NodeProps {
  tempNodeId: string
  node: DefaultNode
}

const props = withDefaults(defineProps<NodeProps>(), {
  tempNodeId: '',
  node: () => ({
    config: {},
    nodeName: '',
    nodeType: ''
  })
})

const userNum = computed(() => {
  return props.node.config.custom && props.node.config.custom.length
    ? `人员：${props.node.config.custom.length}人 `
    : ''
})

const departNum = computed(() => {
  return props.node.config.departId
    ? `部门：${props.node.config.departId.length}个`
    : ''
})

// const {  } = useSelectObject(props.node.config)

// 获取流程数据
// const processData = inject(KEY_PROCESS_DATA)
// 获取流程验证器实例
const validator = inject<Validator>(KEY_VALIDATOR)

// 注册验证器
validator?.register(props.tempNodeId || '', () => {
  console.log('321', props.node)
  let valid = false
  let message = ''
  if (!userNum.value) {
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
