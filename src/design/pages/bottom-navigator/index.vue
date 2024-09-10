<template>
  <div class="nav-container" ref="elementRef">
    <PhoneModel
      :tarbarList="formData.tarbarList"
      :styleValue="styleValue"
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
                  <el-radio-group v-model="showType">
                    <el-radio :value="1">常规</el-radio>
                    <el-radio :value="2">中间凹陷</el-radio>
                    <el-radio :value="3">中间凸出</el-radio>
                  </el-radio-group>
                </div>
                <div class="tip-desc">
                  说明：选择凹陷或凸出样式时只能上传单数
                </div>
              </div>
            </el-form-item>
            <div class="item-container" ref="sortableList">
              <div
                :class="['item', 'item-' + index]"
                v-for="(item, index) in formData.tarbarList"
                :key="index"
                :data-index="index"
              >
                <div class="title">
                  导航{{ index + 1 }}
                  <span v-if="!index">：首页</span>
                </div>
                <div class="item-content">
                  <div class="left flex-start margin-right-40">
                    <el-form-item
                      label=""
                      :prop="`tarbarList.${index}.iconPath`"
                      :rules="{
                        required: true,
                        message: '请上传图片',
                        trigger: ['change']
                      }"
                    >
                      <div class="image-item margin-right-16">
                        <div
                          class="upload margin-bottom-12"
                          @click="() => openDailog('iconPath', index)"
                          v-if="!item.iconPath"
                        ></div>
                        <div
                          v-else
                          class="image-container margin-bottom-12"
                          @click="() => openDailog('iconPath', index)"
                        >
                          <div
                            :class="'iconfont ' + item.iconPath"
                            v-if="item.type === 'system'"
                          ></div>
                          <el-image
                            style="width: 112px; height: 112px"
                            :src="item.iconPath"
                            fit="cover"
                            v-else
                          />
                          <div class="tip">更换图片</div>
                        </div>
                        <span class="image-text">未选中</span>
                      </div>
                    </el-form-item>
                    <el-form-item
                      label=""
                      :prop="`tarbarList.${index}.selectedIconPath`"
                      :rules="{
                        required: true,
                        message: '请上传图片',
                        trigger: ['change']
                      }"
                    >
                      <div class="image-item">
                        <div
                          class="upload margin-bottom-12"
                          @click="() => openDailog('selectedIconPath', index)"
                          v-if="!item.selectedIconPath"
                        ></div>
                        <div
                          v-else
                          class="image-container margin-bottom-12"
                          @click="() => openDailog('selectedIconPath', index)"
                        >
                          <div
                            :class="'iconfont ' + item.selectedIconPath"
                            v-if="item.type === 'system'"
                          ></div>
                          <el-image
                            style="width: 112px; height: 112px"
                            :src="item.selectedIconPath"
                            fit="cover"
                            class="margin-bottom-12"
                          />
                          <div class="tip">更换图片</div>
                        </div>
                        <span class="image-text">选中</span>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="right">
                    <div class="right-item flex-start margin-bottom-12">
                      <el-form-item
                        label=""
                        :prop="`tarbarList.${index}.text`"
                        :rules="{
                          required: true,
                          message: '请输入名称',
                          trigger: ['blur', 'change']
                        }"
                      >
                        <template #label>
                          <span class="xingxing">*</span>
                          <span>名称：</span>
                        </template>
                        <el-input
                          clearable
                          v-model="item.text"
                          maxlength="3"
                          style="width: 180px"
                          placeholder="请输入"
                        />
                      </el-form-item>
                    </div>
                    <div class="right-item flex-start">
                      <el-form-item
                        label=""
                        :prop="`tarbarList.${index}.pagePath`"
                        :rules="{
                          required: true,
                          message: '请选择',
                          trigger: ['blur', 'change']
                        }"
                      >
                        <template #label>
                          <span class="xingxing">*</span>
                          <span>跳转：</span>
                        </template>
                        <el-select
                          v-model="item.pagePath"
                          placeholder="请选择"
                          style="width: 180px"
                          clearable
                        >
                          <template v-if="!index">
                            <el-option
                              v-for="v in homeOptions"
                              :disabled="v.disabled"
                              :key="v.value"
                              :label="v.label"
                              :value="v.value"
                            />
                          </template>
                          <template v-else>
                            <el-option
                              v-for="v in otherOption"
                              :disabled="v.disabled"
                              :key="v.value"
                              :label="v.label"
                              :value="v.value"
                            />
                          </template>
                        </el-select>
                      </el-form-item>
                      <div class="title-item"></div>
                    </div>
                  </div>
                </div>
                <div
                  class="remove"
                  @click="() => remove(index)"
                  v-if="index !== 0"
                >
                  <el-icon>
                    <CirclePlus />
                  </el-icon>
                </div>
              </div>
            </div>

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
import { ref, reactive, onMounted, nextTick } from 'vue'
import DialogUpload from './components/dialog-upload.vue'
import PhoneModel from './components/phone-model.vue'
import {
  getTabbarConfig,
  checkSetIndexPage,
  saveTabbarConfig,
  saveType
} from '@/design/api/diyApi'
import Sortable from 'sortablejs'
import {
  containsIconPathOrSelectedIconPath,
  dataType,
  hasDuplicateText,
  homeOption,
  otherOption,
  typeEnum,
  calculateHeight
} from './config/index'

import useElementHeight from './hook/useElementHeight'

const { elementRef, height } = useElementHeight()

const formRef = ref()
const formData = ref({
  showType: '',
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

const homeOptions = reactive(homeOption)

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

function remove(i: number) {
  if (formData.value.tarbarList.length < 2) {
    ElMessage({
      message: '至少需要设置2个导航栏',
      type: 'error'
    })
    return
  }
  formData.value.tarbarList.splice(i, 1)
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

const sortableList = ref<any>(null)
function sortHandle() {
  Sortable.create(sortableList.value, {
    animation: 150,
    ghostClass: 'sortable-ghost', // 设置虚影类名
    filter: '.item-0',
    onMove: function (evt) {
      const canSort = evt.related.getAttribute('data-index') // 获取 data-id 属性
      // 如果是，阻止这次移动
      return Number(canSort) !== 0
    },
    onUpdate: function (evt: { oldIndex: number; newIndex: number }) {
      const newIndex = evt.newIndex
      const oldIndex = evt.oldIndex
      const movedItem = formData.value.tarbarList.splice(oldIndex, 1)[0] // 从旧位置移除元素
      formData.value.tarbarList.splice(newIndex, 0, movedItem) // 在新位置插入元素
      const list = formData.value.tarbarList.map((item) => {
        return {
          ...item
        }
      })
      // 必须清除先
      formData.value.tarbarList = []
      nextTick(() => {
        formData.value.tarbarList = list
      })
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
  // 排序
  sortHandle()
  // 计算scroll 的高度
  calculateHeight(scrollHeight)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
