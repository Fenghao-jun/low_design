<template>
  <!-- 审核人配置 -->
  <div>
    <el-form :model="formData" label-width="130px">
      <el-form-item label="发起对象:">
        <SelectObject type="inCharge" v-model="formData.userId"></SelectObject>
      </el-form-item>

      <el-form-item label="多人审批方式:" prop="approvalType">
        <el-radio-group v-model="formData.approvalType">
          <el-radio value="COUNTER_SIGN" size="large"
            >会签（须所有审批人同意）</el-radio
          >
          <el-radio value="OR_SIGN" size="large"
            >或签（一名审批人同意或拒绝即可）</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
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

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style scoped></style>
