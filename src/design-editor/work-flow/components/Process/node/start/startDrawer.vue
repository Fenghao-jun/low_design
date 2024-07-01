<template>
  <!-- 发起人配置 -->
  <div>
    <!-- <org-select
      ref="start-copy-user-org"
      v-model="formData.launch"
      title="选择用户"
      class="mb-5"
    />
    <org-select
      ref="start-copy-user-org"
      v-model="formData.launch"
      title="选择部门"
      class="mb-5"
    /> -->
    <SelectObject v-model="formData.userId"></SelectObject>
    <SelectObject v-model="formData.departId" type="department"></SelectObject>
  </div>
</template>

<script lang="ts" setup name="StartDrawer">
import { inject } from 'vue'
import { KEY_PROCESS_DATA } from '@editor/work-flow/components/Process/config/keys'
import SelectObject from '@editor/work-flow/components/Process/components/selectObject/index.vue'
// import OrgSelect from '../../components/OrgSelect'

const props = defineProps({
  config: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  },
  formData: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  }
})

// const { proxy } = getCurrentInstance()

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)
</script>

<style scoped></style>
