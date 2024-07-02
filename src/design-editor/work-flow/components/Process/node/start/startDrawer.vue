<template>
  <!-- 发起人配置 -->
  <div>
    <el-form :model="props.config" label-width="130px">
      <el-form-item label="发起对象：">
        <SelectObject v-model="formData.userId" />
        <SelectObject v-model="formData.departId" type="department" />
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

<script lang="ts" setup name="StartDrawer">
import { inject, ref } from 'vue'
import { KEY_PROCESS_DATA } from '@editor/work-flow/components/Process/config/keys'
import SelectObject from '@editor/work-flow/components/Process/components/selectObject/index.vue'
import {
  getDepartStaff,
  getDepartTree,
  getFLowRelationTarget
} from '@editor/api/workFlow'
// import OrgSelect from '../../components/OrgSelect'

const props = defineProps({
  config: {
    // 传入的流程配置数据
    type: Object,
    default: () => ({})
  },
  formData: {
    // 传入的流程配置数据
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

<style lang="scss" scoped></style>
