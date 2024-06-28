<template>
  <!-- 审核人配置 -->
  <div>
    <!-- <el-form :model="props.config" label-width="80px">
      <el-form-item label="审核人">
        <el-input v-model="props.config.name" />
      </el-form-item>
    </el-form> -->
    <SelectObject type="inCharge" v-model="formData.inCharge"></SelectObject>
  </div>
</template>

<script lang="ts" setup name="ApproverDrawer">
import { getCurrentInstance, inject } from 'vue'
import { KEY_PROCESS_DATA } from '../../config/keys'
import SelectObject from '@editor/work-flow/components/Process/components/selectObject/index.vue'

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

// const { proxy } = getCurrentInstance()

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style scoped></style>
