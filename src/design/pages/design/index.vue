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
import { usePageDataStore } from '@core/store/page-data'
import { Variable } from '@core/types/index'

const store = usePageDataStore()

const pageConfig = ref({
  components: []
})

const initPageConfig = async (pageId: string) => {
  const res = await getPageConfig(pageId)

  initializePageData(res.data.pageData)

  pageConfig.value = res.data as any
}

/**
 * 初始化页面数据
 */
const initializePageData = (pageData: Variable[] = []) => {
  console.log('pageData: ', pageData)
  const initializeData = (pageData || []).reduce((prev, variable) => {
    prev[variable.name] = variable.defaultValue
    return prev
  }, {})

  store.mergeData(initializeData)
}

const route = useRoute()

if (route.params.pageId) {
  initPageConfig(route.params.pageId as string)
} else {
  ElMessage({ type: 'error', message: '页面ID缺失' })
}
</script>
