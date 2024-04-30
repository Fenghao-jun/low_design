<template>
 <Suspense>
  <AsyncComp></AsyncComp>
  <template #fallback>
    <slot name="fallback">
      isLoading status component
    </slot>
  </template>
 </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Props } from './type'
const props = defineProps<Partial<Omit<Props, 'remoteConfig'>> & Pick<Props, 'remoteConfig'>>()

const AsyncComp = defineAsyncComponent(() => import('demo_components/protable.vue'))
</script>

<style scoped></style>
