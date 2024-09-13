<template>
  <div class="phone-container" :style="{ height: `${height - 72}px` }">
    <div class="header-top"></div>
    <div
      :class="{
        'phone-bottom': true,
        'shadow-style': showType !== 'CHANGE_GUI'
      }"
    >
      <div
        class="nav-item"
        v-for="(item, index) in tarbarList"
        :key="index"
        :style="Number(styleValue) === 1 ? upAndDownStyle : leftAndRightStyle"
      >
        <!--  icon 类型 -->
        <template v-if="containsIconPathOrSelectedIconPath(item.iconPath)">
          <template v-if="showType === 'TU' && showTuChuStyle(index)">
            <div class="tu">
              <div :class="'icon iconfont ' + item.iconPath"></div>
            </div>
            <div class="tu-name">{{ item.text }}</div>
          </template>
          <template v-else-if="showType === 'AO' && showAutuStyle(index)">
            <div class="ao">
              <el-image class="ao-image" :src="item.iconPath" />
            </div>
            <!-- <div class="mask-line" /> -->
            <div class="ao-name">{{ item.text }}</div>
          </template>
          <template v-else>
            <div :class="'icon iconfont ' + item.iconPath"></div>
            <div class="name">{{ item.text }}</div>
          </template>
        </template>

        <!-- 用户自定义上传类型 -->
        <template v-else>
          <template v-if="showType === 'TU' && showTuChuStyle(index)">
            <div class="tu">
              <el-image class="tu-image" :src="item.iconPath" />
            </div>
            <div class="tu-name">{{ item.text }}</div>
          </template>
          <template v-else-if="showType === 'AO' && showAutuStyle(index)">
            <div class="ao">
              <el-image class="ao-image" :src="item.iconPath" />
            </div>
            <!-- <div class="mask-line" /> -->
            <div class="ao-name">{{ item.text }}</div>
          </template>
          <template v-else>
            <el-image class="image" :src="item.iconPath" />
            <div class="name">{{ item.text }}</div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup name="phoneModel">
import { reactive } from 'vue'
import { containsIconPathOrSelectedIconPath } from '../config/index'

const props = withDefaults(
  defineProps<{
    tarbarList: any[]
    styleValue: number
    height: number
    showType: string
  }>(),
  {
    tarbarList: () => [],
    styleValue: 1,
    showType: 'TU',
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

// 展示凸出效果
function showTuChuStyle(index: number) {
  const { tarbarList } = props
  if (
    (index === 1 && tarbarList.length === 3) ||
    (index === 2 && tarbarList.length === 5)
  ) {
    return true
  }
}

// 展示凹陷效果
function showAutuStyle(index: number) {
  const { tarbarList } = props
  if (
    (index === 1 && tarbarList.length === 3) ||
    (index === 2 && tarbarList.length === 5)
  ) {
    return true
  }
}
</script>
<style lang="scss" scoped>
.phone-container {
  display: inline-block;
  background: #000;
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
    height: 54px;
    display: flex;
    background-color: #fff;
    position: absolute;
    left: 0px;
    right: 0px;
    // bottom: -6px;
    bottom: 0px;
    border-top: 1px solid #e5e9f2;

    .nav-item {
      flex: 1;
      position: relative;
      z-index: 100;
      padding: 8px 0;
      box-sizing: border-box;
      // box-shadow: 0px -2px 4px 0px rgba(88, 88, 88, 0.08);

      .icon {
        line-height: 20px;
        font-size: 20px;
      }

      .image {
        width: 20px;
        height: 20px;
        :deep(.el-image__inner) {
          width: 20px;
          height: 20px;
        }
      }

      .name {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
}
.dataso-container {
  .header-top {
    left: 200px;
  }
}

.shadow-style {
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(88, 88, 88, 0.08);
  border-radius: 0px 0px 0px 0px;
  height: 54px !important;
  border-top: 1px solid transparent !important;
}

.tu {
  width: 48px;
  height: 48px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%; /* 顶部半圆，底部平直 */
  box-shadow: 0px -2px 4px 0px rgba(88, 88, 88, 0.2);
  position: absolute;
  top: -19px;
  .tu-image {
    width: 40px !important;
    height: 40px !important;
    background: #ebebeb;
    border-radius: 0px 0px 0px 0px;
    border-radius: 50%;
    z-index: 101;
  }
  .icon {
    line-height: 40px !important;
    font-size: 40px !important;
    z-index: 101;
  }
}

.tu::after {
  content: '';
  position: absolute;
  top: 19px;
  width: 54px;
  height: 29px;
  background-color: #fff;
}

.tu-name {
  margin-top: 24px;
  font-size: 12px;
}

.ao {
  position: absolute;
  top: -18px;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: 0px 2px 4px 0px rgba(88, 88, 88, 0.08);
  z-index: 100;

  .ao-image {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    z-index: 102;
    position: absolute;
  }
}

.ao-name {
  margin-top: 22px;
  font-size: 12px;
}
.ao::before,
.ao::after {
  content: '';
  position: absolute;
  top: 18px;
  width: 15px;
  height: 12px;
  background-color: transparent;
}
.ao::before {
  left: -14px;
  border-radius: 0 22px 0 0;
  box-shadow: 1px -4px 2px -3px rgba(88, 88, 88, 0.08);
}

.ao::after {
  right: -14px;
  border-radius: 22px 0 0 0;
  box-shadow: -1px -4px 2px -3px rgba(88, 88, 88, 0.08);
}

.mask-line {
  width: 70px;
  height: 5px;
  position: absolute;
  top: -5px;
  background: #fff;
  z-index: 98;
}
</style>
