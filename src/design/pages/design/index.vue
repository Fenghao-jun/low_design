<template>
  <div>
    <Render :components="pageConfig.components" />
    设计 321
    <!-- <Render /> -->
    <template v-if="loading">
      loading
    </template>
    <template v-else>
      <HelloWorld :msg="msg" :count="count" @click="msg = msg.toUpperCase()" @add="count++"></HelloWorld>
    </template>
  </div>
</template>

<script setup lang="ts" name="design">
import { defineAsyncComponent, ref } from 'vue'
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
const loading = ref(false)
const msg = ref('hello 111')
const count = ref(1)
const HelloWorld = defineAsyncComponent(() => import('components/Button.vue')
  .finally(() => {
    loading.value = false;
  }));

</script>
