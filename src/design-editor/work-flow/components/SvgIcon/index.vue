<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface SvgIconProps {
  iconClass: string
  color?: string
  className?: string
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  color: '',
  className: ''
})

const iconName = computed(() => '#icon-' + props.iconClass)
const svgClass = computed(() => {
  return `svg-icon ${props.className}`
})
</script>

<style scoped lang="scss">
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}

.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
