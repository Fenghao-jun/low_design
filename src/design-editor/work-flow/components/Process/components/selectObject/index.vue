<template>
  <div v-if="type === 'inCharge'">部门负责人</div>
  <div v-else>指定{{ type === 'department' ? '部门' : '人员' }}</div>
  <div class="select-object">
    <el-button type="primary" icon="plus" @click="openDialog"
      >选择{{ type === 'department' ? '部门' : '人员' }}</el-button
    >
    <div class="select-object_tag">
      <el-tag
        v-for="tag in selectObjectList"
        :key="tag.id"
        closable
        type="success"
        @close="handleTagDeleted(tag)"
      >
        {{ getTagValue(tag) }}
      </el-tag>

      <el-button
        v-if="selectObjectList.length !== 0"
        link
        type="primary"
        @click="handleClearClick"
        >清除</el-button
      >
    </div>
  </div>

  <el-dialog
    v-model="showDialog"
    :title="`${type === 'department' ? '选择部门' : '选择人员'}`"
    width="500"
    @opened="handleDialogOpened"
  >
    <el-row>
      <el-col :span="12">
        <el-input
          v-model="keyword"
          placeholder="输入搜索"
          style="margin-bottom: 10px"
          size="small"
        />
        <el-tree
          style="max-width: 600px"
          :data="treeData"
          :props="treeProps"
          show-checkbox
          accordion
          ref="treeRef"
          :node-key="
            type === 'department' || type === 'inCharge' ? 'id' : 'userId'
          "
          check-strictly
          @check="handleTreeCheck"
          :filter-node-method="filterNode"
        />
      </el-col>
      <el-col :span="12">
        <div v-for="tag in selectObject" :key="tag.id">
          <el-tag type="success" @close="handleTagDeleted(tag)">
            {{
              type === 'department' || type === 'inCharge'
                ? tag.departName
                : tag.realName
            }}
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
import { watchThrottled } from '@vueuse/core'

const props = withDefaults(defineProps<SelectObjectProps>(), {
  type: 'person',
  modelValue: () => []
})

const emit = defineEmits(['update:modelValue'])

const treeRef = ref<TreeInstance>()

const treeData = ref<any[]>([])

function mergeStaffWithChildren(node) {
  node.forEach((element) => {
    if (element.children && element.children.length > 0) {
      mergeStaffWithChildren(element.children)
    }
    console.log('element: ', element)

    element.children = element.children.concat(element.staff || [])
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
      if (props.type === 'inCharge') {
        function findChargeStaff(node) {
          node.forEach((element) => {
            if (element.children && element.children.length > 0) {
              findChargeStaff(element.children)
            }
            // console.log('element: ', element)

            element.children = (element.children || []).filter(
              (item) => item.isOwner === 1 || !item.userId
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
      const nodeKey =
        props.type === 'department' || props.type === 'inCharge'
          ? 'id'
          : 'userId'

      // console.log('element: ', props.modelValue, element[nodeKey], node)

      // 人员和部门id数据类型不统一，转一下
      const values = props.modelValue.map((item) => Number(item))
      if (values.includes(Number(element[nodeKey]))) {
        objs.push(element)
      }
    })
  }
  // console.log('treeData.value: ', props.modelValue)

  findObject(treeData.value)

  return objs
})

const treeProps = {
  label(data, node) {
    return data.realName || data.departName
  },
  disabled(data, node) {
    if (props.type === 'inCharge') {
      // 部门负责人
      return data.realName
    }
    return data.children && data.departName && props.type !== 'department'
  }
}

const selectIds = ref([])
const selectObject = ref<any[]>([])
const handleTreeCheck: TreeInstance['onCheck'] = (node, selectTreeData) => {
  console.log('selectTreeData: ', selectTreeData)
  if (props.type === 'department' || props.type === 'inCharge') {
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
  console.log('node: ', node, props.modelValue)
  emit(
    'update:modelValue',
    props.modelValue.filter(
      (item) =>
        item !=
        node[
          props.type === 'department' || props.type === 'inCharge'
            ? 'id'
            : 'userId'
        ] +
          ''
    )
  )
}

const getTagValue = (node: any) => {
  if (props.type === 'inCharge') {
    const owners = node.staff.filter((item) => item.isOwner === 1)
    return (
      node.departName + ' : ' + owners.map((item) => item.realName).join(',') ||
      ' '
    )
  } else if (props.type === 'department') {
    return node.departName
  } else if (props.type === 'person') {
    return node.realName
  }
}

const handleClearClick = () => {
  emit('update:modelValue', [])
}

// 搜索
const keyword = ref('')
const filterNode = (value: string, data: any) => {
  if (!value) return true
  console.log('data: ', data)

  const field =
    props.type === 'department' || props.type === 'inCharge'
      ? 'departName'
      : 'realName'

  return data[field]?.includes(value)
}

watchThrottled(keyword, (nValue) => {
  treeRef.value?.filter(nValue)
})

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
.select-object_tag {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 600px;
  flex-wrap: wrap;
}
</style>
