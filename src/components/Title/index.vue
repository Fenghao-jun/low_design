<template>
  <div class="jfk-title">
    <div :class="`is-${type}`">
        <slot>{{ title }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="Title">
import { TitleProps } from './interface'
withDefaults(defineProps<TitleProps>(), {
  title: '',
  type: 'subtitle'
})

</script>

<style  scoped>
  .jfk-title {
    padding: 0;
    .is-subtitle {
      font-size: 18px;
      padding: 0 10px;
      font-family: "PingFangSC-Light";
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
        transform:translate(0, -50%);
        border-radius: 3px;
      }
    }
    .is-maintitle {
      font-size: 18px;
    }
  }
</style>
