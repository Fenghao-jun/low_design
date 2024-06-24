<template>
  <div class="transfer__body" v-loading="state.allLoading" :style="{height}">
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <el-input placeholder="输入关键词进行搜索" v-model="state.pagination.keyword" @keydown.enter.exact.prevent="search"
          clearable>
          <el-button :icon="Search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="transfer-pane__body left-pane">
        <el-tabs v-model="state.activeName" class="transfer-pane__body-tab">
          <el-tab-pane label="全部数据" name="all">
            <el-tree :data="state.treeData" :props="props" check-on-click-node
              @node-click="handleNodeClick" class="JNPF-common-el-tree" node-key="id"
              v-loading="state.loading" lazy :load="loadNode" v-if="!state.isAsync">
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <i :class="data.icon"></i>
                  <span class="text">{{node.label}}</span>
                </span>
              </template>
            </el-tree>
            <div class="single-list" ref="infiniteBody" v-if="state.isAsync"
              v-loading="state.loading && state.pagination.currentPage==1">
              <template v-if="state.treeData.length">
                <div v-for="(item,index) in state.treeData" :key="index" class="selected-item-user"
                  @click="handleNodeClick(item)">
                  <div class="selected-item-main">
                    <!-- <el-avatar :size="36" :src="define.comUrl+item.headIcon"
                      class="selected-item-headIcon">
                    </el-avatar> -->
                    <div class="selected-item-text">
                      <p class="name">{{item.fullName}}</p>
                      <p class="organize" :title="item.organize">{{item.organize}}</p>
                    </div>
                  </div>
                </div>
              </template>
              <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
            </div>
          </el-tab-pane>
          <el-tab-pane label="当前组织" name="department">
            <div class="single-list" v-loading="state.loading">
              <template v-if="state.treeData2.length">
                <div v-for="(item,index) in state.treeData2" :key="index" class="selected-item-user"
                  @click="handleNodeClick2(item)">
                  <div class="selected-item-main">
                    <!-- <el-avatar :size="36" :src="define.comUrl+item.headIcon"
                      class="selected-item-headIcon">
                    </el-avatar> -->
                    <div class="selected-item-text">
                      <p class="name">{{item.fullName}}</p>
                      <p class="organize" :title="item.organize">{{item.organize}}</p>
                    </div>
                  </div>
                </div>
              </template>
              <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的下属" name="subordinates">
            <div class="single-list" v-loading="state.loading">
              <template v-if="state.treeData3.length">
                <div v-for="(item,index) in state.treeData3" :key="index" class="selected-item-user"
                  @click="handleNodeClick2(item)">
                  <div class="selected-item-main">
                    <!-- <el-avatar :size="36" :src="define.comUrl+item.headIcon"
                      class="selected-item-headIcon">
                    </el-avatar> -->
                    <div class="selected-item-text">
                      <p class="name">{{item.fullName}}</p>
                      <p class="organize" :title="item.organize">{{item.organize}}</p>
                    </div>
                  </div>
                </div>
              </template>
              <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <span>已选</span>
        <el-button @click="removeAll" type="text" class="removeAllBtn">清空列表</el-button>
      </div>
      <div class="transfer-pane__body shadow right-pane">
        <template v-if="state.selectedData.length">
          <div v-for="(item,index) in state.selectedData" :key="index" class="selected-item-user">
            <div class="selected-item-main">
              <!-- <el-avatar :size="36" :src="define.comUrl+item.headIcon"
                class="selected-item-headIcon">
              </el-avatar> -->
              <div class="selected-item-text">
                <p class="name">{{item.fullName}}</p>
                <p class="organize" :title="item.organize">{{item.organize}}</p>
              </div>
              <i class="el-icon-delete" @click="removeData(index)"></i>
            </div>
          </div>
        </template>
        <el-empty description="暂无数据" :image-size="120" v-else></el-empty>
      </div>
    </div>
  </div>
</template>

<script setup name="JNPF-userTransfer">
import { reactive, ref, watch, nextTick } from 'vue'
import { Search } from "@element-plus/icons-vue";

const emits = defineEmits(['input', 'getValue'])


const state = reactive({
  allLoading: false,
  loading: false,
  activeName: '',
  treeData: [],
  treeData2: [],
  treeData3: [],
  selectedData: [],
  props: {
    children: 'children',
    label: 'fullName',
    isLeaf: 'isLeaf'
  },
  nodeId: '0',
  ids: [],
  total: 0,
  isAsync: false,
  finish: false,
  listLoading: false,
  pagination: {
    keyword: '',
    currentPage: 1,
    pageSize: 20,
  }
})

const props = defineProps({
  height: {
    type: String,
    default: "400px"
  },
  value: {
    type: Array,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  }
})
const infiniteBody = ref()

const init = async () => {
  state.selectedData = []
  state.ids = []
  state.pagination.keyword = ''
  state.activeName = ''
  state.nodeId = '0'
  state.isAsync = false
  state.finish = false
  await nextTick()
  state.activeName = 'all'
  getSelectList()
}

const bindScroll = () => {
  console.log(infiniteBody.value)
  // let _this = this,
  //   vBody = _this.$refs.infiniteBody;
  // vBody.addEventListener("scroll", throttle(300, function () {
  //   if (vBody.scrollHeight - vBody.clientHeight - vBody.scrollTop <= 200 && !_this.listLoading && !_this.finish) {
  //     _this.pagination.currentPage += 1
  //     _this.getList()
  //   }
  // }));
}
const getSelectList = () => {
  state.allLoading = true
  if (!props.value.length) state.allLoading = false
  // getUserInfoList(props.value).then(res => {
  //   state.selectedData = res.data.list
  //   state.ids = state.selectedData.map(o => o.id)
  //   state.allLoading = false
  // })
  else {
    state.selectedData = []
    state.ids = []
    state.allLoading = false
  }
}

const search = async () => {
  state.nodeId = '0'
  state.treeData = []
  state.pagination.currentPage = 1
  state.isAsync = !!state.pagination.keyword
  state.finish = false
  if (state.isAsync && state.activeName === 'all') {
    await nextTick()
    bindScroll()
  }
  state.getData()
}

const loadNode = (node, resolve) => {
  if (node.level === 0) {
    state.nodeId = '0'
    return resolve(state.treeData)
  }
  state.nodeId = node.data.id
  // getImUserSelector(state.nodeId).then(res => {
  //   resolve(res.data.list)
  // })
}

const handleNodeClick = (data) => {
  if (data.type !== 'user') return
  handleNodeClick2(data)
}

const handleNodeClick2 = (data) => {
  const boo = state.selectedData.some(o => o.id === data.id)
  if (boo) return
  props.multiple ? state.selectedData.push(data) : state.selectedData = [data]
  props.multiple ? state.ids.push(data.id) : state.ids = [data.id]
  emits('input', state.ids)
  emits('getValue', this.ids, state.selectedData)
}

const removeAll = () => {
  state.selectedData = []
  state.ids = []
  emits('input', state.ids)
  emits('getValue', state.ids, state.selectedData)
}
const removeData = (index) => {
  state.selectedData.splice(index, 1)
  state.ids.splice(index, 1)
  emits('input', state.ids)
  emits('getValue', state.ids, state.selectedData)
}

const getList = () => {
  state.loading = true
  if (state.pagination.keyword) state.nodeId = '0'
  // getImUserSelector(state.nodeId, state.pagination).then(res => {
  //   if (state.pagination.keyword) {
  //     if (res.data.list.length < state.pagination.pageSize) {
  //       state.finish = true
  //     }
  //     state.treeData = [...state.treeData, ...res.data.list]
  //     state.total = res.data.pagination.total
  //   } else {
  //     state.treeData = res.data.list
  //   }
  //   state.loading = false
  // })
}
const getData = () => {
  if (state.activeName === 'all') {
    getList()
  } else if (state.activeName === 'department') {
    state.loading = true
    state.treeData2 = []
    // getOrganization({ keyword: state.pagination.keyword, organizeId: '0' }).then(res => {
    //   state.treeData2 = res.data
    //   state.loading = false
    // })
  } else {
    state.loading = true
    state.treeData3 = []
    // getSubordinates(state.pagination.keyword).then(res => {
    //   state.treeData3 = res.data
    //   state.loading = false
    // })
  }
}

watch(() => state.activeName, (val) => {
  state.pagination.keyword = ''
  state.isAsync = false
  if (!val) return
  state.nodeId = '0'
  state.treeData = []
  state.treeData2 = []
  state.treeData3 = []
  getData()
})
</script>
<style lang="scss" scoped>

.transfer__body {
  line-height: 32px;
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  height: 400px;

  .transfer-pane {
    width: 360px;
  }

  .transfer-pane__tools {
    margin-bottom: 8px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .removeAllBtn {
      color: #f56c6c;
    }
  }

  .transfer-pane__body {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    overflow-x: hidden;
    font-size: 14px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;

    .el-tab-pane {
      padding: 10px 0 !important;
    }

    &.left-pane {
      .custom-title {
        height: 39px;
        padding: 0 12px;
        line-height: 39px;
        font-size: 14px;
        font-weight: 500;
        color: #303133;
        border-bottom: 1px solid #dcdfe6;

        &+.single-list {
          height: calc(100% - 40px);
        }
      }

      .single-list {
        height: 100%;
        overflow: auto;
        overflow-x: hidden;

        .selected-item-user {
          cursor: pointer;
        }

        .selected-item {
          padding: 0px 12px;
          cursor: pointer;

          &:hover {
            background-color: #f5f7fa;
          }
        }
      }
    }
  }

  .selected-item-user {
    padding: 0 12px;

    &:hover {
      background-color: #f5f7fa;
    }

    .selected-item-main {
      border-bottom: 1px solid #F4F6F9;
      display: flex;
      align-items: center;
      height: 50px;
    }

    .selected-item-headIcon {
      flex-shrink: 0;

      &.icon {
        width: 36px;
        height: 36px;
        text-align: center;

        i {
          font-size: 22px;
          line-height: 36px;
        }
      }
    }

    .selected-item-text {
      min-width: 0;
      flex: 1;
      margin-left: 10px;

      .name {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .organize {
        height: 17px;
        line-height: 17px;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .el-icon-delete:hover {
      color: #f56c6c;
      cursor: pointer;
    }
  }

  .selected-item-user-multiple {
    padding-left: 12px;
    position: relative;

    .selected-item-title {
      font-size: 14px;
      color: #303133;
      display: flex;
      align-items: center;

      span {
        padding-left: 6px;
      }
    }

    .selected-item-main {
      box-sizing: content-box;
      display: flex;
      align-items: center;
      height: 64px;
      padding-left: 21px;
      position: relative;

      &:hover {
        background-color: #f5f7fa;
      }

      &:last-child {
        border-bottom: 1px solid #F2F5F8;
      }

      &:not(:last-child) {
        &:before {
          position: absolute;
          content: "";
          bottom: 0;
          right: 0;
          width: calc(100% - 21px);
          height: 1px;
          background-color: #F2F5F8;
        }
      }
    }

    .selected-item-headIcon {
      flex-shrink: 0;

      &.icon {
        width: 36px;
        height: 36px;
        text-align: center;

        i {
          font-size: 22px;
          line-height: 36px;
        }
      }
    }

    .selected-item-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(193deg, #A7D6FF 0%, #1990FA 100%);
      border-radius: 50%;
      line-height: 36px;
      color: #FFFFFF;
      font-size: 14px;
      text-align: center;
    }

    .selected-item-text {
      flex: 1;
      margin-left: 10px;
      min-width: 0;

      .name {
        color: #333333;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .organize {
        color: #999999;
        height: 17px;
        line-height: 17px;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .delete {
      margin-right: 15px;
      font-size: 15px;
      align-items: center;

      &:hover {
        color: #f56c6c;
        cursor: pointer;
      }
    }
  }

  .right-pane {
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid #dcdfe6;

    .selected-item {
      padding: 0px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background-color: #f5f7fa;
      }

      span {
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .el-icon-delete:hover {
        color: #f56c6c;
        cursor: pointer;
      }
    }
  }
}
</style>

