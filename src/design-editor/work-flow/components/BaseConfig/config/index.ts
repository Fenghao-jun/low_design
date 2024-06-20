import { computed } from 'vue'
import { IFromItem } from 'am-admin-component'

export const useEditForm = (
  formData
) => {
  const useEditFormItem = computed<IFromItem[]>(() => {
    return [
      {
        label: '流程名称:',
        type: 'input',
        field: 'name',
        otherOptions: {
          maxlength: '20',
          'show-word-limit': true
        },
        placeholder: '请输入流程名称',
        rules: [
          { required: true, message: '请输入流程名称', trigger: ['blur', 'change'] }
        ]
      },
      {
        label: '流程类型:',
        type: 'select',
        field: 'type',
        options: [],
        placeholder: '请选择流程类型',
        rules: [
          { required: true, message: '请选择流程类型', trigger: ['blur', 'change'] }
        ]
      },
      {
        label: '流程应用:',
        type: 'select',
        field: 'application',
        options: [],
        placeholder: '请选择流程应用',
        rules: [
          { required: true, message: '请选择流程应用', trigger: ['blur', 'change'] }
        ]
      },
      {
        label: '流程说明:',
        type: 'input',
        field: 'desc',
        otherOptions: {
          maxlength: '100',
          type: 'textarea',
          'show-word-limit': true
        },
        placeholder: '请输入流程说明'
      },
    ]
  })

  return {
    useEditFormItem
  }
}
