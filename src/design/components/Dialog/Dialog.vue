<template>
  <el-dialog v-bind="props" v-model="showDialog">
    <template #default>
      <slot />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineExpose } from 'vue'
import { IDialogProps } from './props'

const props = withDefaults(defineProps<IDialogProps>(), {
  width: '500',
  destroyOnClose: true,
  center: true,
  showClose: true
})

const showDialog = ref(false)

const open = () => {
  showDialog.value = true
}

const close = () => {
  showDialog.value = false
}

defineExpose({
  open,
  close
})
</script>

<style scoped></style>
