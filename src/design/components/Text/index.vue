<template>
  <div class="default" v-bind:style="style">{{ value }}</div>
</template>

<script setup lang="ts" name="Text">
import { CSSProperties } from 'vue'
defineProps<{
  style?: CSSProperties
  value?: string
}>()
</script>
<style lang="scss" scoped>
.default {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #817b7b;
  font-size: 14px;
}
</style>
