<template>
  <div>指定{{ type === 'department' ? '部门' : '人员' }}</div>
  <div class="select-object">
    <el-button type="primary" icon="plus" @click="openDialog"
      >选择{{ type === 'department' ? '部门' : '人员' }}</el-button
    >
    <el-tag
      v-for="tag in selectObjectList"
      :key="tag.id"
      closable
      type="success"
      @close="handleTagDeleted(tag)"
    >
      {{ type === 'department' ? tag.departName : tag.realName }}
    </el-tag>

    <el-button
      v-if="selectObjectList.length !== 0"
      link
      type="primary"
      @click="handleClearClick"
      >清除</el-button
    >
  </div>

  <el-dialog
    v-model="showDialog"
    :title="`${type === 'department' ? '选择部门' : '选择人员'}`"
    width="500"
    @opened="handleDialogOpened"
  >
    <el-row>
      <el-col :span="12">
        <el-tree
          style="max-width: 600px"
          :data="treeData"
          :props="treeProps"
          show-checkbox
          accordion
          ref="treeRef"
          :node-key="type === 'department' ? 'id' : 'userId'"
          check-strictly
          @check="handleTreeCheck"
        />
      </el-col>
      <el-col :span="12">
        <div v-for="tag in selectObject" :key="tag.id">
          <el-tag closable type="success" @close="handleTagDeleted(tag)">
            {{ type === 'department' ? tag.departName : tag.realName }}
          </el-tag>
        </div>
      </el-col>
    </el-row>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- <div v-show="false">
    <el-tree
      style="max-width: 600px"
      :data="treeData"
      :props="treeProps"
      show-checkbox
      ref="treeRefWrapper"
      :node-key="type === 'department' ? 'id' : 'userId'"
    />
  </div> -->
</template>

<script setup lang="ts">
import { SelectObjectProps } from './props'
import {
  getDepartStaff,
  getDepartTree,
  getFLowRelationTarget
} from '@editor/api/workFlow'
import {
  ref,
  watch,
  computed,
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose,
  onMounted,
  nextTick,
  watchEffect
} from 'vue'
import { TreeInstance } from 'element-plus'

const props = withDefaults(defineProps<SelectObjectProps>(), {
  type: 'person',
  modelValue: () => []
})

const emit = defineEmits(['update:modelValue'])

const treeRef = ref<TreeInstance>()
const treeRefWrapper = ref<TreeInstance>()

const treeData = ref<any[]>([])

function mergeStaffWithChildren(node) {
  node.forEach((element) => {
    if (
      element.children &&
      element.children.length > 0 &&
      element.staff.length > 0
    ) {
      mergeStaffWithChildren(element.children)
    }
    console.log('element: ', element)

    element.children = element.children.concat(element.staff)
  })
}
const getData = () => {
  if (props.type === 'department') {
    getDepartTree().then((res) => {
      treeData.value = res.data
    })
  } else {
    getDepartStaff().then((res) => {
      mergeStaffWithChildren(res.data)

      // console.log('321')

      if (props.type === 'inCharge') {
        function findChargeStaff(node) {
          node.forEach((element) => {
            if (element.children && element.children.length > 0) {
              findChargeStaff(element.children)
            }
            // console.log('element: ', element)

            element.children = (element.children || []).filter(
              (item) => item.isOwner === 0 || !item.userId
            )
          })
        }
        // 找负责人出来
        findChargeStaff(res.data)
      }

      treeData.value = res.data
    })
  }
}

// 外部用来显示的
const selectObjectList = computed(() => {
  const objs: any[] = []
  function findObject(node) {
    node.forEach((element) => {
      if (element.children && element.children.length > 0) {
        findObject(element.children)
      }
      const nodeKey = props.type === 'department' ? 'id' : 'userId'

      if (props.modelValue.includes(element[nodeKey])) {
        console.log('element: ', element, node)
        objs.push(element)
      }
    })
  }

  findObject(treeData.value)

  return objs
})

const treeProps = {
  label(data, node) {
    return data.realName || data.departName
  },
  disabled(data, node) {
    return data.children && data.departName && props.type !== 'department'
  }
}

const selectIds = ref([])
const selectObject = ref<any[]>([])
const handleTreeCheck: TreeInstance['onCheck'] = (node, selectTreeData) => {
  console.log('selectTreeData: ', selectTreeData)
  if (props.type === 'department') {
    selectIds.value = selectTreeData.checkedKeys.filter((item) => item)
    selectObject.value = selectTreeData.checkedNodes.filter((item) => item.id)
    return
  }

  // 过滤全选可能存在的部门
  selectIds.value = selectTreeData.checkedKeys.filter((item) => item)
  selectObject.value = selectTreeData.checkedNodes.filter((item) => item.userId)
}

const showDialog = ref(false)
const openDialog = () => (showDialog.value = true)
const closeDialog = () => (showDialog.value = false)

const handleDialogOpened = () => {
  treeRef.value?.setCheckedKeys(props.modelValue)
  console.log('props.modelValue: ', props.modelValue)
  nextTick(() => {
    const currentSelectNode = treeRef.value?.getCheckedNodes()
    console.log('currentSelectNode: ', currentSelectNode)
    selectObject.value = currentSelectNode || []
  })
}

const handleConfirmClick = () => {
  const currentSelectNode = treeRef.value
    ?.getCheckedKeys()
    .filter((item) => item)
  console.log('currentSelectNode: ', currentSelectNode)
  closeDialog()
  emit('update:modelValue', currentSelectNode)
}

const handleTagDeleted = (node) => {
  emit(
    'update:modelValue',
    props.modelValue.filter(
      (item) => item !== node[props.type === 'department' ? 'id' : 'userId']
    )
  )
}

const handleClearClick = () => {
  emit('update:modelValue', [])
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.select-object {
  width: 100%;
  // box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
}
:deep(.el-checkbox__input.is-disabled) {
  display: none !important;
}
</style>
