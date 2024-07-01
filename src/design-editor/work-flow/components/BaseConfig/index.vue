<template>
  <div class="form-container">
    <div class="form"></div>

    <!-- <div class="form-operator">
      <el-button v-outActiveBtn type="primary">下一步</el-button>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { useEditForm } from './config/index'
</script>
<style lang="scss">
.form-container {
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .form {
    width: 500px;
  }
  .form-operator {
    padding: 60px 0 60px 190px;
    text-align: left;
    button {
      width: 120px;
    }
  }
}
</style>
