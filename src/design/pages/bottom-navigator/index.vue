<template>
  <div class="nav-container">
    <PhoneModel :tarbarList="formData.tarbarList" :styleValue="styleValue" />
    <!-- 右侧配置项 -->
    <div class="setting-container" v-loading="loading">
      <div class="header">底部导航</div>
      <div class="setting">
        <div class="setting-style">
          <div>样式选择：</div>
          <el-radio-group v-model="styleValue">
            <el-radio :value="1">上图下文</el-radio>
            <el-radio :value="2">左图右文</el-radio>
          </el-radio-group>
        </div>
        <el-form ref="formRef" :model="formData" hide-required-asterisk>
          <div class="item-container" ref="sortableList">
            <div
              :class="['item', 'item-' + index]"
              v-for="(item, index) in formData.tarbarList"
              :key="index"
              :data-index="index"
            >
              <div class="title margin-bottom-15">
                导航{{ index + 1 }}
                <template v-if="!index"> ：首页 </template>
              </div>
              <div class="item-content">
                <div class="left flex-start">
                  <el-form-item
                    label=" "
                    :prop="`tarbarList.${index}.iconPath`"
                    :rules="{
                      required: true,
                      message: '请上传图片',
                      trigger: ['change']
                    }"
                  >
                    <div class="image-item margin-right-10">
                      <div
                        class="upload margin-bottom-5"
                        @click="() => openDailog('iconPath', index)"
                        v-if="!item.iconPath"
                      ></div>
                      <el-image
                        class="margin-bottom-5"
                        style="width: 88px; height: 88px"
                        :src="item.iconPath"
                        fit="cover"
                        v-else
                        @click="() => openDailog('iconPath', index)"
                      />
                      <span class="font-14">未选中</span>
                    </div>
                  </el-form-item>
                  <el-form-item
                    label=" "
                    :prop="`tarbarList.${index}.selectedIconPath`"
                    :rules="{
                      required: true,
                      message: '请上传图片',
                      trigger: ['change']
                    }"
                  >
                    <div class="image-item">
                      <div
                        class="upload margin-bottom-5"
                        @click="() => openDailog('selectedIconPath', index)"
                        v-if="!item.selectedIconPath"
                      ></div>
                      <el-image
                        class="margin-bottom-5"
                        style="width: 88px; height: 88px"
                        :src="item.selectedIconPath"
                        fit="cover"
                        v-else
                        @click="() => openDailog('selectedIconPath', index)"
                      />
                      <span class="font-14">选中</span>
                    </div>
                  </el-form-item>
                </div>
                <div class="right">
                  <div class="right-item flex-start margin-bottom-12">
                    <el-form-item
                      label="名称"
                      :prop="`tarbarList.${index}.text`"
                      :rules="{
                        required: true,
                        message: '请输入名称',
                        trigger: ['blur', 'change']
                      }"
                    >
                      <el-input
                        v-model="item.text"
                        maxlength="3"
                        placeholder="请输入"
                      />
                    </el-form-item>
                  </div>
                  <div class="right-item flex-start">
                    <el-form-item
                      label="跳转"
                      :prop="`tarbarList.${index}.pagePath`"
                      :rules="{
                        required: true,
                        message: '请选择',
                        trigger: ['blur', 'change']
                      }"
                    >
                      <el-select
                        v-model="item.pagePath"
                        placeholder="请选择"
                        style="width: 100%"
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
        </el-form>
        <el-button
          type="primary"
          :icon="Plus"
          @click="add"
          :disabled="formData.tarbarList.length >= 4"
        >
          添加导航（{{ formData.tarbarList.length }}/4）
        </el-button>
      </div>
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
import { ElMessage,  } from 'element-plus'
import { ref, reactive, onMounted, nextTick } from 'vue'
import DialogUpload from './components/dialog-upload.vue'
import PhoneModel from './components/phone-model.vue'
import {
  getTabbarConfig,
  checkSetIndexPage,
  saveTabbarConfig,
  saveType
} from '@/design-editor/api/diyApi'
import Sortable from 'sortablejs'
import {
  dataType,
  hasDuplicateText,
  homeOption,
  otherOption,
  typeEnum
} from './config/index'

const formRef = ref()
const formData = ref({
  tarbarList: [
    {
      pagePath: undefined,
      iconPath: '',
      selectedIconPath: '',
      text: '首页'
    }
  ]
})
const dialogUpload = ref(null)
const styleValue = ref(1)

const homeOptions = reactive(homeOption)

// 添加导航
function add() {
  if (formData.value.tarbarList.length >= 4) {
    ElMessage({
      message: '最多四个',
      type: 'warning',
      plain: true
    })
    return
  }
  formData.value.tarbarList.push({
    pagePath: undefined,
    iconPath: '',
    selectedIconPath: '',
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
  dialogUpload.value && dialogUpload.value?.open({ key: type, index })
}

function getImage(data?: dataType) {
  if (!data) return 
  const { index, localImage, customImage } = data
  const item = formData.value.tarbarList[index]
  if (!item) return
  if (localImage) {
    item.iconPath = localImage[0].fileUrl
    item.selectedIconPath = localImage[1].fileUrl
  } else if (customImage) {
    const { unSelectList, selectList } = customImage
    item.iconPath = unSelectList&&unSelectList.length?unSelectList[0].url:item.iconPath
    item.selectedIconPath = selectList && selectList.length ? selectList[0].url : item.selectedIconPath
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
      formData.value.tarbarList[0].pagePath = homeOptions[4].value as any
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

onMounted(() => {
  // 校验是否设置自定义首页
  isThereAHomepageForDecoration()
  // 获取当前配置
  getTabbarConfigData()
  // 排序
  sortHandle()
})
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 20px;
  padding-bottom: 77px;
  box-sizing: border-box;
  background: #f2f2f2;

  .setting-container {
    display: inline-block;
    width: 500px;
    background: #fff;
    border: #000;

    .header {
      border-bottom: 1px solid #ccc;
      padding: 15px 0;
      margin-bottom: 10px;
    }

    .setting {
      width: 100%;
      height: 100%;
      padding: 15px;

      .setting-style {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
      }

      .item-container {
        width: 100%;

        .title {
          text-align: start;
        }

        .item {
          position: relative;
          width: 100%;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          padding: 10px;
          box-sizing: border-box;

          .item-content {
            width: 100%;
            display: flex;
            justify-content: flex-start;

            .left {
              flex: 1;

              .image-item {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .upload {
                  cursor: pointer;
                  width: 88px;
                  height: 88px;
                  background-image: url('@/assets/images/upload-bg.png');
                  background-repeat: no-repeat;
                }
              }
            }

            .right {
              flex: 1;

              .right-item {
                .title-item {
                  white-space: nowrap;
                }
              }
            }
          }

          .remove {
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: 10px;
            transform: rotate(-45deg);
            font-size: 22px;
            color: #ddd;
          }
        }
      }
    }
  }
}

.save-container {
  width: 100%;
  height: 72px;
  padding: 20px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  z-index: 2004;
}

.el-form-item {
  width: 100% !important;
}

/* 隐藏Element UI el-image组件加载失败时的字体图标 */
:deep(.el-image__error) {
  display: none !important;
}
</style>
