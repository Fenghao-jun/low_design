<template>
  <div>
    <Render :components="pageConfig.components" />
  </div>
</template>

<script setup lang="ts" name="design">
import { ref } from 'vue'
import Render from '@core/render/RootRender/RootRender.vue'
import { getPageConfig } from '@design/api'

const pageConfig = ref({
  components: []
})

const initPageConfig = async () => {
  const res = await getPageConfig()
  pageConfig.value = res.data as any
  // 测试remote
  pageConfig.value.components = (pageConfig.value.components as any[]).map(
    (c) => {
      if (c.key === 'RemoteComponent') {
        return {
          ...c,
          props: {
            remote: {
              scope: 'demo',
              name: 'protable'
            }
          }
        }
      }
      return c
    }
  )
  pageConfig.value.components.push({
    ...pageConfig.value.components[pageConfig.value.components.length - 1],
    key: 'RemoteComponent',
    props: {
      remote: { scope: 'demo', name: 'increment' },
      msg: 'hello world',
      increment: () => {
        console.log('hello world')
      }
    }
  })
}

initPageConfig()
</script>
