<template>
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
              >
                <div class="plus">+</div>
                <div class="upload-text">上传图片</div>
              </div>
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
              >
                <div class="plus">+</div>
                <div class="upload-text">上传图片</div>
              </div>
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
                <span>名称：</span>
              </template>
              <el-input
                clearable
                v-model="item.text"
                maxlength="3"
                style="width: 200px"
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
                <span>跳转：</span>
              </template>
              <el-select
                v-model="item.pagePath"
                placeholder="请选择"
                style="width: 200px"
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
      <div class="remove" @click="() => remove(index)" v-if="index !== 0">
        <el-icon>
          <CirclePlus />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup name="tarBarItem">
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, reactive, ref } from 'vue'
import Sortable from 'sortablejs'
import { otherOption } from '../config'

const emits = defineEmits(['update:formData', 'openDailog'])

const props = withDefaults(
  defineProps<{
    homeOptions: () => []
    formData: any
  }>(),
  {
    formData: () => {
      return {}
    }
  }
)

const sortableList = ref<any>(null)
function sortHandle() {
  const { formData } = props
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
      const movedItem = formData.tarbarList.splice(oldIndex, 1)[0] // 从旧位置移除元素
      formData.tarbarList.splice(newIndex, 0, movedItem) // 在新位置插入元素
      const list = formData.tarbarList.map((item) => {
        return {
          ...item
        }
      })
      // 必须清除先
      formData.tarbarList = []
      emits('update:formData', formData)
      nextTick(() => {
        formData.tarbarList = list
        emits('update:formData', formData)
      })
    }
  })
}
function openDailog(type: string, index: number) {
  emits('openDailog', type, index)
}

function remove(i: number) {
  const { formData } = props
  if (formData.tarbarList.length < 2) {
    ElMessage({
      message: '至少需要设置2个导航栏',
      type: 'error'
    })
    return
  }
  formData.tarbarList.splice(i, 1)
  emits('update:formData', formData)
}

onMounted(() => {
  // 排序
  sortHandle()
})
</script>
<style lang="scss" scoped>
@import '../index.scss';
</style>
