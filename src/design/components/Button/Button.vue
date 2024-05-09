<template>
  <ElButton v-bind="props" @click="handleClick">
    {{ content }}
  </ElButton>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { ButtonProps } from './props'

const props = withDefaults(defineProps<ButtonProps>(), {
  content: 'hello',
  type: 'primary'
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style scoped></style>
