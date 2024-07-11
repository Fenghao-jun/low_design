<template>
  <!-- 条件配置 -->
  <div>
    <el-form :model="formData" label-width="130px">
      <el-form-item label="选择功能流程:">
        <!-- <el-input v-model="formData.name" /> -->
        <el-select
          v-model="formData.flowScene"
          placeholder="请选择功能流程"
          style="width: 240px"
        >
          <el-option
            v-for="item in flowList"
            :key="item.flowScene"
            :label="item.flowName"
            :value="item.flowScene"
            :disabled="isDisabled(item)"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="FeatureDrawer">
import { inject, watch } from 'vue'
import { KEY_PROCESS_DATA } from '../../config/keys'
import {
  TOTAL_SELECTED_FLOW_KEY,
  FLOW_LIST_KEY
} from '@design/pages/work-flow/projectFlow/keys'
import { FlowListItem } from '@editor/api/workFlow'

const props = defineProps({
  config: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

watch(
  () => props.formData.flowScene,
  (nValue, oValue) => {
    // console.log('nValue, oValue: ', nValue, oValue, selectFlowHandler)
    selectFlowHandler?.setSelectedFlow(nValue, oValue)
  }
)

const isDisabled = (item: FlowListItem) => {
  // console.log('3333', selectFlowHandler?.totalSelectedFlow.value)

  return selectFlowHandler?.totalSelectedFlow.value.includes(item.flowScene)
}

const flowList = inject(FLOW_LIST_KEY)

const selectFlowHandler = inject(TOTAL_SELECTED_FLOW_KEY)

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style scoped></style>
