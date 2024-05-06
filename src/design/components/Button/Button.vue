<template>
  <div @click="foo">321</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['increment'])

const foo = () => {
  console.log('emit')

  emit('increment', 'hello')
}
</script>

<style scoped></style>
