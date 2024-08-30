<template>
  <!-- 上传列表 -->
  <div v-if="props.fileList && props.fileList.length">
    <div
      class="image-item"
      v-for="(item, index) in props.fileList"
      :key="index"
    >
      <el-image class="image" :src="item.url" fit="cover" />
      <div class="hover-container">
        <span class="preview" @click="() => handlePictureCardPreview(item)">
          <el-icon><zoom-in /></el-icon>
        </span>
        <span class="delete-item">
          <el-icon @click="() => handleRemove(index)"><Delete /></el-icon>
        </span>
      </div>
    </div>
  </div>

  <!-- 上传组件 -->
  <el-upload
    v-if="props.fileList.length < props.limit"
    :show-file-list="false"
    list-type="picture-card"
    :limit="props.limit"
    :http-request="customUpload"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 加号标识 -->
    <template #default>
      <el-icon><Plus /></el-icon>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible" width="80%">
    <img
      style="width: 100%; height: 500px"
      :src="dialogImageUrl"
      alt="Preview Image"
    />
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
    limit: number
  }>(),
  {
    fileList: () => [],
    limit: 1
  }
)

const emits = defineEmits<{
  'update:fileList': [value: any[]]
}>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 清除
const handleRemove = (index) => {
  const list = [...props.fileList]
  list.splice(index, 1)
  emits('update:fileList', list)
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
        const list = props.fileList.length
          ? [
              ...JSON.parse(JSON.stringify(props.fileList)),
              {
                name: fileName,
                url: fileUrl,
                id: props.fileList.length
              }
            ]
          : [
              {
                name: fileName,
                url: fileUrl,
                id: props.fileList.length
              }
            ]
        emits('update:fileList', list)
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

.image-item {
  transition: all 0.3s;
  position: relative;
  width: 146px;
  height: 146px;
  border: 1px dashed #ccc;
  border-radius: 10px;
  overflow: hidden;

  .image {
    width: 146px;
    height: 146px;
    margin-right: 20px;
  }
  .hover-container {
    transition: all 0.3s;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgb(0, 0, 0, 0.3);
    z-index: -1;
    .preview {
      margin-right: 10px;
    }
  }
}

.image-item:hover {
  .hover-container {
    z-index: 100;
    opacity: 1;
    cursor: pointer;
    font-size: 22px;
    color: #fff;
  }
}
</style>
