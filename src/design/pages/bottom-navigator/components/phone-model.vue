<template>
    <div class="phone-container">
        <div class="phone-content">
            <div class="phone-bottom">
                <div class="nav-item" v-for="(item, index) in tarbarList" :key="index"
                    :style="Number(styleValue) === 1 ? upAndDownStyle : leftAndRightStyle">
                    <el-image class="image" :src="item.selectedIconPath" />
                    <div class="name">{{ item.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="tsx" setup name="phoneModel">
import { reactive } from "vue"
const props = withDefaults(defineProps<{ tarbarList: any[], styleValue: number }>(), {
    tarbarList: () => [],
    styleValue: 1,
})

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
    width: 376px;
    height: 736px;
    background: #dddddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 120px;
    background-image: url('../../../../assets/images/phone-bg.png');
    background-repeat: no-repeat;

    .phone-content {
        width: 337px;
        height: 554px;
        position: relative;
        left: -2px;
        bottom: -6px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        .phone-bottom {
            width: 100%;
            height: 57px;
            display: flex;
            background-color: #fff;

            .nav-item {
                flex: 1;

                .image {
                    width: 20px;
                    height: 20px;
                }

                .name {
                    font-size: 12px;
                    margin: 3px;
                }
            }
        }
    }
}
</style>