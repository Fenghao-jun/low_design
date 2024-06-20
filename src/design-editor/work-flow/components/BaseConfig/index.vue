<template>
  <div class="form-container">
    <CustomForm
      ref="formRef"
      :from-items="useEditFormItem"
      v-model="formData"
      label-width="130"
      :col-layout="{
        xl: 24,
        lg: 24,
        md: 24,
        sm: 24,
        xs: 24
      }">
    </CustomForm>
    <div class="form-operator">
      <el-button v-outActiveBtn type="primary">下一步</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useEditForm } from './config/index.ts'
import { ref } from 'vue';
import { CustomForm } from 'am-admin-component'

// <Partial<IReqSaveOrUpdateSchemeParams>>
const formData = ref({
  name: '',
  type: '',
  application: '',
  desc: ''
})
const { useEditFormItem } = useEditForm(
  formData
)
</script>
<style lang="scss">
.form-container {
  padding-top: 60px;
  .form-operator {
    padding: 60px 0 60px 190px;
    text-align: left;
    button {
      width: 120px;
    }
  }
}
</style>
