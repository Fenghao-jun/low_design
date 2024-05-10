<template>
  <el-row v-bind="rowProps">
    <el-col
      v-for="item in children"
      v-bind="item.props?.colProps"
      :key="item.componentId"
    >
      <Render :components="[item]"> </Render>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" Name="Container">
import { RowProps } from 'element-plus'
import Render from '@/design-core/render/RootRender/RootRender.vue'

withDefaults(
  defineProps<{ children?: any[]; rowProps?: Partial<RowProps> }>(),
  {
    rowProps: () => ({}),
    children: () => []
  }
)
</script>
