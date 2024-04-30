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
  pageConfig.value = res.data
}

initPageConfig()
</script>
