<template>
  <!-- 审核人配置 -->
  <div>
    <el-form :model="props.config" label-width="130px">
      <el-form-item label="发起对象：" required>
        <!-- <SelectObject v-model="formData.userId" />
        <SelectObject v-model="formData.departId" type="department" /> -->
        <div>
          项目关联成员
          <div>
            <el-select
              v-model="formData.custom"
              placeholder="请选择"
              style="width: 240px"
              multiple
              filterable
            >
              <el-option
                v-for="item in relationTargetList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              />
            </el-select>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup name="ApproverDrawer">
import { getCurrentInstance, inject, ref } from 'vue'
import { KEY_PROCESS_DATA } from '../../config/keys'
import SelectObject from '../../components/selectObject/index.vue'
import {
  getDepartStaff,
  getDepartTree,
  getFLowRelationTarget
} from '@editor/api/workFlow'

const props = defineProps({
  config: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

// const { proxy } = getCurrentInstance()

// 获取流程数据
const processData = inject(KEY_PROCESS_DATA)

const relationTargetList = ref<any[]>([])
const getFLowRelationTargetRequest = async () => {
  const res = await getFLowRelationTarget()
  relationTargetList.value = res.data
}
getFLowRelationTargetRequest()
</script>

<style scoped></style>
