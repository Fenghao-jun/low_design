<template>
  <div
    :style="{
      position: 'absolute',
      top: position?.top + 'px',
      left: position?.left + 'px'
    }"
  >
    <el-dropdown ref="dropDownRef">
      <span class="el-dropdown-link">
        <!-- Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="a">Action 1</el-dropdown-item>
          <el-dropdown-item command="b">Action 2</el-dropdown-item>
          <el-dropdown-item command="c">Action 3</el-dropdown-item>
          <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
          <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElDropdown } from 'element-plus'

interface ContentMenuProps {
  position?: {
    top?: number
    left?: number
  }
}
const props = withDefaults(defineProps<ContentMenuProps>(), {
  position: () => ({
    top: 0,
    left: 0
  })
})

const dropDownRef = ref<InstanceType<typeof ElDropdown>>()

const showDropDown = () => {
  dropDownRef.value?.handleOpen()
}

const hiddenDropDown = () => {
  dropDownRef.value?.handleClose()
}

defineExpose({
  showDropDown,
  hiddenDropDown
})
</script>

<style scoped></style>
