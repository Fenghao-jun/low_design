<template>
  <div class="org-select" :class="{'org-select__button':buttonType === 'button'}">
    <div class="tags">
      <el-button v-if="buttonType === 'button'" icon="plus" @click="state.show = true"
        style="margin-bottom: 6px;">
        {{title}}
      </el-button>
      <div class="input-box" :class="{'as-input': buttonType === 'input'}" @click="state.show = true">
        <el-tag v-bind="tagConfig" class="org-tag" v-for="(item,i) in state.selectedData" :key="item.key"
          @close="onClose(item,i)">
          {{item.fullName}}
        </el-tag>
      </div>
    </div>
    <org-transfer ref="transfer" :value="state.innerValue" :title="title" v-model:visible="state.show"
      @confirm="onConfirm" :type="type" />
  </div>
  <div></div>
</template>
<script setup>
import { reactive, computed, watch, nextTick } from 'vue'
import OrgTransfer from '../OrgTransfer'

// const title = defineModel('change', 'value')
const emits = defineEmits(['change'])

const props = defineProps({
  value: {
    type: Array,
    default: () => ([]),
    required: true
  },
  title: {
    type: String,
    default: '组织机构'
  },
  type: {
    type: String,
    default: 'user'
  },
  buttonType: {
    type: String,
    default: 'button'
  }, // or input
  tagConfig: {
    type: Object,
    default: () => ({
      type: 'info',
      closable: true,
      'disable-transitions': false,
      hit: false,
      color: undefined,
      size: 'small',
      effect: 'light'
    })
  },
})

const state = reactive({
  show: false,
  innerValue: null,
  selectedData: []
})

const allList = computed(() => {
  let list = []
  if (this.type !== 'user' && this.type !== 'users') {
    // list = this.$store.getters[this.type + 'List']
    list = []
  }
  return list
})

const reloadCmpData = async () => {
  state.innerValue = props.value
  // transfer 可能还未加载成功
  await nextTick()
  initSelectedData()
}

const initSelectedData = () => {
  if (props.type === 'user') {
    if (!state.innerValue.length) state.selectedData = []
    else {
      // getUserInfoList(this.innerValue).then(res => {
      //   this.selectedData = res.data.list
      // })
      state.selectedData = []
    }
  } else if (props.type === 'users') {
    if (!state.innerValue.length) state.selectedData = []
    else {
      // getSelectedList(this.innerValue).then(res => {
      //   this.selectedData = res.data.list
      // })
      state.selectedData = []
    }
  } else {
    state.selectedData = state.innerValue.map(t => ({
      id: t,
      fullName: getText(t)
    }))
  }
}
const getText = (id) => {
  let text = ''
  if (props.type !== 'user' && props.type !== 'users') {
    const arr = allList.value.filter(o => o.id === id)
    if (!arr.length) return ''
    text = arr[0].fullName || ''
  }
  return text
}

const onClose = (item, i) => {
  state.innerValue.splice(i, 1)
  state.selectedData.splice(i, 1)
  emits('change', state.innerValue)
}
const onConfirm = (data) => {
  state.innerValue = data
  emits('change', state.innerValue)
}


watch(() => props.value, (val) => {
  if (!val) return
  reloadCmpData()
}, {
  immediate: true,
  deep: true
})
</script>
<style lang="scss" scoped>
.tags {
  .input-box.as-input {
    border: 1px solid #dcdfe6;
    padding-left: 6px;
    font-size: 12px;
    min-height: 32px;
    line-height: 30px;
    border-radius: 4px;
    background: white;
    color: #606266;
    cursor: pointer;
  }

  .org-tag {
    margin-right: 6px;
    // max-width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding-right: 1rem;
    vertical-align: middle;

    >>> .el-tag__close {
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -7px;
    }
  }
}
.org-select__button {
  .org-tag {
    margin-bottom: 3px;
  }
}
</style>
