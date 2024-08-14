<template>
  <el-dialog
    ref="dialog"
    :closeOnClickModal="false"
    :width="'800'"
    close-on-press-escape
    v-model="showDialog"
  >
    <div class="content" v-loading="loading" element-loading-text="上传中">
      <el-tabs v-model="activeValue" class="tabs">
        <el-tab-pane label="系统图标" :name="1">
          <div class="font-size-14 margin-bottom-15 flex-start">
            说明：选中效果会根据皮肤主题色自动变更
          </div>
          <div class="icon-container">
            <div
              v-for="(item, index) in localIconList"
              :key="index"
              :class="{
                item: true,
                'margin-right-20': true,
                'margin-bottom-20': true,
                active: isActive === index
              }"
              @click="() => clickItem(index)"
            >
              <div class="center">
                <div :class="'iconfont ' + item.iconPath"></div>
                <div :class="'iconfont ' + item.selectedIconPath"></div>
                <!-- <el-image style="width: 40px; height: 40px" :src="item.iconPath" class="margin-right-6" />
                <el-image style="width: 40px; height: 40px" :src="item.selectedIconPath" /> -->
              </div>
              <div class="font-14 margin-top-24">{{ item.text }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义上传" :name="2">
          <div class="upload-container">
            <div class="upload-item center">
              <Upload v-model:fileList="unSelectList" v-if="showDialog" />
              <div class="margin-top-15">未选中</div>
            </div>
            <div class="margin-right-20"></div>
            <div class="upload-item center">
              <Upload v-model:fileList="selectList" v-if="showDialog" />
              <div class="margin-top-15">选中</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="confirm-container center">
        <el-button
          type="primary"
          class="confirm-btn padding-right-40 padding-left-40"
          @click="confirmhandle"
        >
          确认
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script lang="tsx" setup>
import axios from 'axios'
import { ref, defineExpose, reactive, defineEmits, nextTick } from 'vue'
import request from '@/design/http'
import { ElMessage } from 'element-plus'
import Upload from './upload.vue'
import { localImageList } from '../config'

const emit = defineEmits(['postImage'])

const loading = ref<boolean>(false)
const showDialog = ref<boolean>(false)
const activeValue = ref<any>(1)
const config = ref<any>({})
const isActive = ref(0) //  系统选择选中项
const unSelectList = ref([])
const selectList = ref([])

const localIconList = reactive(localImageList)

// 打开弹窗
function open(data: object) {
  showDialog.value = true
  config.value = { ...data }
}

// 关闭弹窗
function close() {
  showDialog.value = false
  config.value = {}
  unSelectList.value = []
  selectList.value = []
  isActive.value = 0
  activeValue.value = 1
}

// 本地上传
async function clickItem(i: number) {
  isActive.value = i
}

// 获取本地图片
async function getLocalImageAsFile(imagePath) {
  try {
    const response = await axios.get(imagePath, {
      responseType: 'blob' // 指定响应类型为blob
    })
    if (response.status === 200) {
      // 使用 Blob 创建 File 对象
      const file = new File([response.data], 'image.png', { type: 'image/png' })
      return file
    }
  } catch (error) {
    console.error('获取图片文件失败:', error)
    throw error
  }
}

// 上传API
function uploadAPI(dataFile) {
  const file = dataFile
  const formDatas = new FormData()
  formDatas.append('file', file)
  return new Promise((resolve, reject) => {
    loading.value = true
    request
      .post<any, any>({
        url: `/oss-api/oss/b/objectUpload`,
        data: formDatas,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        // console.log('res: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
      .finally(() => {
        loading.value = false
      })
  })
}

// 确认
function confirmhandle() {
  if (activeValue.value === 1) {
    systemUpload()
  } else {
    emit('postImage', {
      ...config.value,
      customImage: {
        unSelectList: unSelectList.value,
        selectList: selectList.value
      }
    })
  }
  close()
}

async function systemUpload() {
  const JSONConfig = { ...config.value }
  const i = isActive.value
  const selectedIconPath = localIconList[i].selectedIconPath
  const iconPath = localIconList[i].iconPath
  emit('postImage', {
    ...JSONConfig,
    localImage: {
      selectedIconPath,
      iconPath
    }
  })
  close()
}

defineExpose({
  open,
  close
})
</script>
<style lang="scss" scoped>
.content {
  height: 380px;
  position: relative;
}

.icon-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.confirm-container {
  width: 100%;
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
}

.item {
  width: 100px;
  height: 100px;
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.active {
  width: 100px;
  height: 100px;
  border: 1px solid #ac9456;
}

.upload-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;

  .upload-item {
    flex-direction: column;
  }
}

.iconfont {
  font-size: 40px;
}
</style>
