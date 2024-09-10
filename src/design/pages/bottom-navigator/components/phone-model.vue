<template>
  <div class="phone-container" :style="{ height: `${height - 72}px` }">
    <div class="header-top"></div>
    <div class="phone-bottom">
      <div
        class="nav-item"
        v-for="(item, index) in tarbarList"
        :key="index"
        :style="Number(styleValue) === 1 ? upAndDownStyle : leftAndRightStyle"
      >
        <div
          :class="'icon iconfont ' + item.iconPath"
          v-if="containsIconPathOrSelectedIconPath(item.iconPath)"
        ></div>
        <el-image v-else class="image" :src="item.iconPath" />
        <div class="name">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup name="phoneModel">
import { reactive } from 'vue'
import { containsIconPathOrSelectedIconPath } from '../config/index'

const props = withDefaults(
  defineProps<{ tarbarList: any[]; styleValue: number; height: number }>(),
  {
    tarbarList: () => [],
    styleValue: 1,
    height: 0
  }
)

const upAndDownStyle = reactive({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
})

const leftAndRightStyle = reactive({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
</script>
<style lang="scss" scoped>
.phone-container {
  display: inline-block;
  background: #fff;
  display: flex;
  margin: 0 120px;
  width: 375px;
  min-width: 375px;
  max-width: 375px;
  max-height: 675px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  position: relative;
  border: 1px solid #e5e9f2;
  overflow: hidden;

  .header-top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 64px;
    background-image: url('https://static-comm.dataso.net/upload/20240806/a111111112/f4edfc55e24f36faba851711134a991f.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #0000;
  }

  .phone-bottom {
    width: 100%;
    height: 57px;
    display: flex;
    background-color: #fff;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -6px;
    border-top: 1px solid #e5e9f2;
    padding: 10px 0;
    box-sizing: border-box;

    .nav-item {
      flex: 1;

      .icon {
        line-height: 20px;
        font-size: 20px;
      }

      .image {
        width: 20px;
        height: 20px;
        line-height: 20px;
      }

      .name {
        font-size: 12px;
        margin: 3px;
      }
    }
  }
}
.dataso-container {
  .header-top {
    left: 200px;
  }
}
</style>
