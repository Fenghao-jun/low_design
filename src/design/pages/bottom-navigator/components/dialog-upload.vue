<template>
  <el-dialog
    :closeOnClickModal="false"
    :width="'800'"
    close-on-press-escape
    v-model="showDialog"
  >
    <div class="content" v-loading="loading" element-loading-text="上传中">
      <el-tabs v-model="activeValue" class="tabs">
        <el-tab-pane label="系统图标" name="system">
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
              </div>
              <div class="font-14 margin-top-24">{{ item.text }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义上传" name="custom">
          <div class="upload-container">
            <div class="upload-item center">
              <Upload
                v-if="activeValue === 'custom'"
                v-model:fileList="unSelectList"
                :limit="1"
              />
              <div class="margin-top-15">未选中</div>
            </div>
            <div class="margin-right-20"></div>
            <div class="upload-item center">
              <Upload
                v-if="activeValue === 'custom'"
                v-model:fileList="selectList"
                :limit="1"
              />
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
import { ref, defineExpose, reactive, defineEmits } from 'vue'
import Upload from './upload.vue'
import { localImageList } from '../config'
import {} from 'am-admin-component'
import { deepClone } from 'am-polyfill'

const emit = defineEmits(['postImage'])

const loading = ref<boolean>(false)
const showDialog = ref<boolean>(false)
const activeValue = ref<any>('system')
const config = ref<any>({})
const isActive = ref(0) //  系统选择选中项
const unSelectList = ref<any>([])
const selectList = ref<any>([])

const localIconList = reactive(localImageList)

// 打开弹窗
function open(data: any) {
  showDialog.value = true
  config.value = { ...data }
  const { item } = data
  activeValue.value = item.type || 'system'
  if (activeValue.value === 'custom') {
    // 未选中
    unSelectList.value = item.iconPath
      ? [{ name: '自定义图片', url: item.iconPath, id: 1 }]
      : []

    // 选中
    selectList.value = item.selectedIconPath
      ? [{ name: '自定义图片', url: item.selectedIconPath, id: 1 }]
      : []
  }
  delete config.value.item
}

// 关闭弹窗
function close() {
  showDialog.value = false
  config.value = {}
  unSelectList.value = []
  selectList.value = []
  isActive.value = 0
  activeValue.value = 'system'
}

// 本地上传
async function clickItem(i: number) {
  isActive.value = i
}

// 确认
function confirmhandle() {
  if (activeValue.value === 'system') {
    systemUpload()
  } else {
    emit('postImage', {
      ...config.value,
      customImage: {
        unSelectList: deepClone(unSelectList.value),
        selectList: deepClone(selectList.value)
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
  line-height: 40px;
}
</style>
