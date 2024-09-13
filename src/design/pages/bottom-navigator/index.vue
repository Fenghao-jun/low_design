<template>
  <div class="nav-container" ref="elementRef">
    <PhoneModel
      :tarbarList="formData.tarbarList"
      :styleValue="styleValue"
      :showType="formData.showType"
      :height="height"
    />
    <!-- 右侧配置项 -->
    <div class="setting-container" v-loading="loading">
      <div class="header">底部导航</div>
      <el-form ref="formRef" :model="formData">
        <el-scrollbar :height="scrollHeight + 'px'">
          <div class="setting">
            <el-form-item label="类型选择：">
              <el-radio-group v-model="styleValue" @change="handleChange">
                <el-radio :value="1">上图下文</el-radio>
                <el-radio :value="2">左图右文</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="样式选择：">
              <div>
                <div>
                  <el-radio-group v-model="formData.showType">
                    <el-radio value="CHANGE_GUI">常规</el-radio>
                    <el-radio value="AO">中间凹陷</el-radio>
                    <el-radio value="TU">中间凸出</el-radio>
                  </el-radio-group>
                </div>
                <div class="tip-desc">
                  说明：选择凹陷或凸出样式时只能上传单数
                </div>
              </div>
            </el-form-item>
            <tarBarItem
              v-model:formData="formData"
              :homeOptions="homeOptions"
              @openDailog="openDailog"
            />

            <el-button
              class="add-btn"
              :icon="Plus"
              @click="add"
              :disabled="
                styleValue === 1
                  ? formData.tarbarList.length >= 5
                  : formData.tarbarList.length >= 4
              "
            >
              添加导航（{{ formData.tarbarList.length }}/
              {{ styleValue === 1 ? 5 : 4 }}）
            </el-button>
          </div>
        </el-scrollbar>
      </el-form>
    </div>
    <DialogUpload ref="dialogUpload" @postImage="getImage" />
    <div class="save-container center">
      <el-button
        type="primary"
        class="btn-save padding-right-40 padding-left-40"
        @click="save"
        :disabled="loading"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="bottomNavigator">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, onMounted, nextTick, reactive } from 'vue'
import DialogUpload from './components/dialog-upload.vue'
import PhoneModel from './components/phone-model.vue'
import tarBarItem from './components/tarBar-item.vue'
import {
  getTabbarConfig,
  checkSetIndexPage,
  saveTabbarConfig,
  saveType
} from '@/design/api/diyApi'
import {
  containsIconPathOrSelectedIconPath,
  dataType,
  hasDuplicateText,
  typeEnum,
  calculateHeight,
  homeOption
} from './config/index'

import useElementHeight from './hook/useElementHeight'

const { elementRef, height } = useElementHeight()

const formRef = ref()
const formData = ref({
  showType: 'AO',
  tarbarList: [
    {
      pagePath: undefined,
      iconPath: '',
      selectedIconPath: '',
      type: 'custom',
      text: '首页'
    }
  ]
})
const dialogUpload = ref<InstanceType<typeof DialogUpload>>()
const styleValue = ref(1)

// 添加导航
function add() {
  const conditionTemp = {
    1: formData.value.tarbarList.length >= 5, // 上下图文 五个
    2: formData.value.tarbarList.length >= 4 // 左右图文 四个
  }
  if (conditionTemp[styleValue.value]) {
    ElMessage({
      message: styleValue.value === 1 ? '最多五个' : '最多四个',
      type: 'warning',
      plain: true
    })
    return
  }
  formData.value.tarbarList.push({
    pagePath: undefined,
    iconPath: '',
    selectedIconPath: '',
    type: 'system',
    text: ''
  })
}

// type icon 类型
function openDailog(type: string, index: number) {
  const item = formData.value.tarbarList[index]
  dialogUpload.value &&
    dialogUpload.value?.open({
      key: type,
      index,
      item: JSON.parse(JSON.stringify(item))
    })
}

// 接受用户选中的图片
function getImage(data?: dataType) {
  if (!data) return
  const { index, localImage, customImage } = data
  const item = formData.value.tarbarList[index]
  if (!item) return
  if (localImage) {
    item.type = 'system'
    item.iconPath = localImage.iconPath
    item.selectedIconPath = localImage.selectedIconPath
  } else if (customImage) {
    const { unSelectList, selectList } = customImage
    const iconPath = containsIconPathOrSelectedIconPath(item.iconPath)
      ? ''
      : item.iconPath
    const selectedIconPath = containsIconPathOrSelectedIconPath(
      item.selectedIconPath
    )
      ? ''
      : item.selectedIconPath
    item.type = 'custom'
    item.iconPath =
      unSelectList && unSelectList.length ? unSelectList[0].url : iconPath
    item.selectedIconPath =
      selectList && selectList.length ? selectList[0].url : selectedIconPath
  }
}

const homeOptions = reactive(homeOption)
// 获取配置
async function getTabbarConfigData() {
  const res = await getTabbarConfig()
  if (res && res.code === '0') {
    const config = res.data.config ? JSON.parse(res.data.config) : ''
    if (config) {
      formData.value.tarbarList = config.tarbar
      styleValue.value = typeEnum[config.iconStyle]
    }
  }
}

// 查询是否存在首页装修页
async function isThereAHomepageForDecoration() {
  const res = await checkSetIndexPage()
  if (res && res.code === '0') {
    // 判断装修模块是否设置 首页
    homeOptions[2].disabled = !res.data.checkRet
    if (res.data.checkRet) {
      // 默认选中
      formData.value.tarbarList[0].pagePath = homeOptions[2].value as any
    }
  }
}

const loading = ref(false)
// 保存
async function save() {
  if (loading.value) return
  if (hasDuplicateText(formData.value.tarbarList)) {
    ElMessage({
      message: '名称不能重复',
      type: 'error'
    })
    return
  }
  if (formData.value.tarbarList.length < 2) {
    ElMessage({
      message: '最少设置两个',
      type: 'error'
    })
    return
  }
  formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const JSONConfig = JSON.stringify({
        tarbar: formData.value.tarbarList,
        showType: formData.value.showType,
        iconStyle: styleValue.value === 1 ? 'vertical' : 'horizontal'
      })
      const params: saveType = {
        config: JSONConfig
      }
      const res = await saveTabbarConfig(params)
      if (res && res.code === '0') {
        ElMessage({
          message: '保存成功',
          type: 'success'
        })
      }
      loading.value = false
    }
  })
}

function handleChange(value) {
  ElMessage.closeAll()
  // 左右图文最多四个
  if (value === 2 && formData.value.tarbarList.length >= 5) {
    ElMessage({
      message: '左右图文最多四个',
      type: 'error'
    })
    styleValue.value = 1
  }
}

const scrollHeight = ref(0)

onMounted(() => {
  // 校验是否设置自定义首页
  isThereAHomepageForDecoration()
  // 获取当前配置
  getTabbarConfigData()
  // 计算scroll 的高度
  calculateHeight(scrollHeight)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
