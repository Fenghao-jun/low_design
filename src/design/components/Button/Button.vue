<template>
  <div @click="foo">321</div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits(['click'])

const foo = () => {
  emit('click', 'hello')
}
</script>

<style scoped></style>
