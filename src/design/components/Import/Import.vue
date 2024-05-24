<template>
  <el-dialog
    v-model="dialogVisible"
    title="批量导入"
    width="800"
    @close="handleCloseClick"
  >
    <div class="import-dialog">
      <template v-if="uploadSuccess">
        共导入{{ uploadResult.total }}条数据，成功{{
          uploadResult.successTotal
        }}条，失败{{ uploadResult.errorTotal }}条。

        <el-table
          v-if="uploadResult.errorList.length > 0 && errorColumns"
          :data="uploadResult.errorList"
          border
        >
          <el-table-column
            v-for="item in errorColumns"
            :key="item.props"
            v-bind="item"
          />
        </el-table>
      </template>
      <template v-else>
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
      </template>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <template v-if="uploadSuccess">
          <el-button @click="handleCloseClick">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确认
          </el-button>
        </template>
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
const emit = defineEmits<{ success: [] }>()

const dialogVisible = ref(false)
const uploadSuccess = ref(false)
const open = () => {
  dialogVisible.value = true
}
const close = () => {
  selectedFile.value = null
  selectedFileName.value = ''
  dialogVisible.value = false
  uploadSuccess.value = false
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
const uploadResult = ref({
  errorList: [],
  errorTotal: 0,
  successTotal: 0,
  total: 0
})
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
  requestAction({
    url: props.api.url,
    data: { file: selectedFile.value },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      console.log('res: ', res)
      uploadResult.value = res.data as any
      // ElMessage({ type: 'success', message: '导入成功' })
      // emit('success')
      // close()
    })
    .catch((err) => {
      console.log('err: ', err)
    })
    .finally(() => {
      loading.value = false
      uploadSuccess.value = true
    })
}

const handleCloseClick = () => {
  emit('success')
  close()
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
