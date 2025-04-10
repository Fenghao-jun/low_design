<template>
  <template v-if="isPermissionBtn">
    <ElButton v-bind="props" @click="handleClick" :loading="loading">
      {{ content }}
    </ElButton>
  </template>
  <ElButton v-else v-bind="props" @click="handleClick" :loading="loading">
    {{ content }}
  </ElButton>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineExpose, ref } from 'vue'
import { ButtonProps } from './props'

const props = withDefaults(defineProps<ButtonProps>(), {
  content: 'hello',
  type: 'primary',
  permissionCode: ''
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
// 是否显示权限按钮
const isPermissionBtn = computed(() => props.permissionCode)

defineExpose({
  showLoading,
  hiddenLoading
})
</script>

<style scoped></style>
