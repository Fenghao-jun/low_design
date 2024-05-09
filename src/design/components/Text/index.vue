<template>
  <span v-bind:style="style">{{ value }}</span>
</template>

<script setup lang="ts" name="Text">
import { CSSProperties } from 'vue'
defineProps<{
  style?: CSSProperties
  value?: string
}>()
</script>
