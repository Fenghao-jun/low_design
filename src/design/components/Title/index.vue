<template>
  <div class="title" v-bind:style="wrapperStyle">
    <div :class="`is-${type}`" v-bind:style="style">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup name="Title">
import type { CSSProperties } from 'vue'
withDefaults(
  defineProps<{
    type?: 'maintitle' | 'subtitle'
    title?: string
    wrapperStyle?: CSSProperties
    style?: CSSProperties
  }>(),
  {
    type: 'subtitle',
    title: '',
    wrapperStyle: () => ({}),
    style: () => ({})
  }
)
</script>

<style lang="scss" scoped>
.title {
  padding: 0;
  margin-top: 10px;
  margin-bottom: 12px;
  .is-subtitle {
    font-size: 18px;
    padding: 0 10px;
    font-family: 'PingFangSC-Light';
    font-weight: bold;
    position: relative;
    text-align: left;
    &::after {
      position: absolute;
      content: '';
      left: 0;
      top: 50%;
      background-color: #b2945e;
      width: 3px;
      height: 17px;
      transform: translate(0, -50%);
      border-radius: 3px;
    }
  }
  .is-maintitle {
    font-size: 18px;
  }
}
</style>
