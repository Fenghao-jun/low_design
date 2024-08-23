<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :limit="1"
    :http-request="customUpload"
    :before-upload="beforeAvatarUpload"
    :class="{
      hide: fileList.length >= 1
    }"
  >
    <!-- 加号标识 -->
    <template #default>
      <el-icon><Plus /></el-icon>
    </template>
    <!-- 上传后显示 -->
    <template #file="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <el-icon><zoom-in /></el-icon>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <el-icon><Delete /></el-icon>
        </span>
      </span>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup name="upload">
import { ref, defineEmits, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/design/http'
import { Delete, Plus, UploadProps, ZoomIn } from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    fileList?: any[]
  }>(),
  {
    fileList: () => []
  }
)

const emits = defineEmits<{
  'update:fileList': [value: any[]]
}>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const fileList = ref<any>([])
const disabled = ref(false)

// 清除
const handleRemove = (file) => {
  fileList.value = []
}

function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 定义一个包含所有允许的图片格式的数组
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  // 检查文件类型是否在允许的类型中
  if (!allowedTypes.includes(rawFile.type)) {
    ElMessage.error('请上传有效的图片格式!')
    return false
  }
  return true
}

// 上传API
async function customUpload({ file }) {
  if (beforeAvatarUpload(file)) {
    const formDatas = new FormData()
    formDatas.append('file', file)
    request
      .post<any, any>({
        url: `/oss-api/oss/b/objectUpload`,
        data: formDatas,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        console.log('res: ', res)
        const { fileUrl, fileName } = res.data as any
        emits('update:fileList', [
          { name: fileName, url: fileUrl, id: fileList.value.length }
        ])
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

</script>

<style lang="scss" scoped>
.hide {
  :deep(.el-upload--picture-card) {
    display: none !important;
  }
}
</style>
