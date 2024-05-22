<template>
  <el-dialog v-model="dialogVisible" title="批量导入" width="500">
    <div class="import-dialog">
      <p v-if="selectedFileName">{{ selectedFileName }}</p>

      <el-button v-else @click="chooseFile">选择附件</el-button>
      <input
        type="file"
        ref="fileInput"
        accept=".xls,.xlsx"
        style="display: none"
        @change="handleFileChange"
      />

      <div class="template-tip">
        <p>{{ template?.text }}</p>
        <el-button type="primary" text @click="handleDownClick">
          下载模版
        </el-button>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="handleConfirmClick">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps } from 'vue'
import { ImportProps } from './props'
import { ElMessage } from 'element-plus'
import { useApi } from '@/design/hooks/useApi'

const props = defineProps<ImportProps>()

const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
const close = () => {
  dialogVisible.value = false
}

const selectedFileName = ref('')
const selectedFile = ref()
const fileInput = ref<HTMLInputElement>()

const chooseFile = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (file) {
    selectedFileName.value = file.name
    selectedFile.value = file
    // 在这里可以进一步处理文件，例如使用FileReader API
    console.log('Selected file:', file.name)
  }
}

const loading = ref(false)
const handleConfirmClick = async () => {
  if (!selectedFile.value) {
    ElMessage({
      type: 'error',
      message: '请选择导入文件'
    })
    return
  }

  const { requestAction } = useApi(props.api)
  loading.value = true
  requestAction({ url: props.api.url }).finally(() => {
    loading.value = false
  })
}

const handleDownClick = () => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = props.template?.url || ''
  link.setAttribute('download', props.template?.filename || '')
  link.setAttribute('referrerpolicy', 'no-referrer')
  // document.body.appendChild(link)
  link.click()
  // document.body.removeChild(link)
}
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>
.import-dialog {
  text-align: start;
  .template-tip {
    display: flex;
    align-items: center;
  }
}
</style>
