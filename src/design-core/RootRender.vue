<template>
  <div>
    根的render
    <component :is="componentId" :ref="el=>setComponentRef(id,el)"/>
  </div>
</template>

<script setup lang="ts">
// TODO 最外层的render
import { setComponentRef } from '@core/utils/component-ref'
</script>

<style scoped>

</style>