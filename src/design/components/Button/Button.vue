<template>
  <ElButton v-bind="props" @click="handleClick" :loading="loading">
    {{ content }}
  </ElButton>
</template>

<script setup lang="ts">
import { defineEmits, defineExpose, ref } from 'vue'
import { ButtonProps } from './props'

const props = withDefaults(defineProps<ButtonProps>(), {
  content: 'hello',
  type: 'primary'
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

const loading = ref(false)

/**
 * 显示loading
 */
const showLoading = () => {
  loading.value = true
}
/**
 * 隐藏loading
 */
const hiddenLoading = () => {
  loading.value = false
}

defineExpose({
  showLoading,
  hiddenLoading
})
</script>

<style scoped></style>
