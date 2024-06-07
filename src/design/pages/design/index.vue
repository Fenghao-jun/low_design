<template>
  <div>
    <el-skeleton :rows="20" :loading="loadingPage" animated>
      <template #default>
        <Render :components="pageConfig.components" />
      </template>
    </el-skeleton>
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

const loadingPage = ref(true)

const initPageConfig = async (pageId: string) => {
  const res = await getPageConfig(pageId)

  initializePageData(res.data.pageData)

  pageConfig.value = res.data as any
  loadingPage.value = false
}

/**
 * 初始化页面数据
 */
const route = useRoute()
const initializePageData = (pageData: Variable[] = []) => {
  console.log('pageData: ', pageData)
  const initializeData = (pageData || []).reduce((prev, variable) => {
    prev[variable.name] = variable.defaultValue
    return prev
  }, {})

  store.mergeData({
    ...initializeData,
    routeParams: route.params,
  routeQuery: route.query
  })
}

window.addEventListener('pageshow', (event) => {
  // event.persisted属性为true时，表示当前文档是从往返缓存中获取
  if (event.persisted) {
    location.reload()
  }
})
if (route.params.pageId) {
  initPageConfig(route.params.pageId as string)
} else {
  ElMessage({ type: 'error', message: '页面ID缺失' })
}
</script>
