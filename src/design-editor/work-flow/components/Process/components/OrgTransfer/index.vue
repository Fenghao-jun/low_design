
<template>
  <el-dialog v-model="visible" :title="title" :close-on-click-modal="false"
    class="JNPF-dialog JNPF-dialog_center transfer-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="800px" :modal-append-to-body="false" @open="onOpen">
    <UserTransfer v-model="state.selectedData" ref="userTransfer" multiple v-if="type==='user'" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeTransfer">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup name='org-transfer'>
import UserTransfer from '../userTransfer'
import { reactive, ref, nextTick, defineModel } from 'vue'
const emits = defineEmits(['confirm'])
const visible = defineModel('visible')

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'user'
  },
  title: {
    type: String,
    default: '组织机构'
  }
})

const state = reactive({
  loading: false,
  treeData: [],
  selectedData: []
})
const userTransfer = ref()

const onOpen = () => {
  dataInit()
}
const closeTransfer = () => {
  visible.value = false
}
const confirm = () => {
  emits('confirm', state.selectedData)
  closeTransfer()
}
const dataInit = async () => {
  state.loading = true
  state.selectedData = []
  state.treeData = []
  await nextTick()
  if (state.type === 'user') {
    state.selectedData = JSON.parse(JSON.stringify(state.value))
    await nextTick()
    userTransfer.value.init()
  } else if (state.type === 'users') {
    state.selectedData = JSON.parse(JSON.stringify(state.value))
    userTransfer.value.init()
  } else if (state.type === 'role') {
    state.selectedData = JSON.parse(JSON.stringify(state.value))
    userTransfer.value.init()
  } else {
    const res = []
    if (state.type === 'department') {
      // res = await state.$store.dispatch('generator/getDepTree')
    }
    if (state.type === 'group') {
      // res = await state.$store.dispatch('generator/getGroupTree')
    }
    if (state.type === 'position') {
      // res = await state.$store.dispatch('base/getPositionTree')
    }
    // state.$refs.JNPFTransfer && (state.$refs.JNPFTransfer.filterText = '')
    state.treeData = res
    state.selectedData = state.value
  }
  state.loading = false
}
</script>
