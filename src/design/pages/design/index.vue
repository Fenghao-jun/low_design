<template>
  <div>
    <Render :components="pageConfig.components" />
  </div>
</template>

<script setup lang="ts" name="design">
import { ref } from 'vue'
import Render from '@core/render/RootRender/RootRender.vue'
import { getPageConfig } from '@design/api'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const pageConfig = ref({
  components: []
})

const initPageConfig = async (pageId: string) => {
  const res = await getPageConfig(pageId)
  pageConfig.value = res.data as any
}

const route = useRoute()

if (route.params.pageId) {
  initPageConfig(route.params.pageId as string)
} else {
  ElMessage({ type: 'error', message: '页面ID缺失' })
}
</script>
