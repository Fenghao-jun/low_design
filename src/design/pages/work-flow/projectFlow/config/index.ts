import { computed, Ref } from 'vue'
// import { IFromItem } from 'am-admin-component'

export const useEditForm = (
  formData,
  type: Ref<any[]>,
  scene: Ref<any[]>,
  business: Ref<any[]>,
  flowEvent: Ref<any[]>
) => {
  const useEditFormItem = computed<any[]>(() => {
    return [
      {
        label: '流程名称:',
        type: 'input',
        field: 'flowName',
        otherOptions: {
          maxlength: '20',
          'show-word-limit': true
        },
        placeholder: '请输入流程名称',
        rules: [
          {
            required: true,
            message: '请输入流程名称',
            trigger: ['blur', 'change']
          }
        ]
      },
      {
        label: '流程类型:',
        type: 'select',
        field: 'flowType',
        options: type.value,
        optionsKey: 'code',
        optionsValueKey: 'desc',
        placeholder: '请选择流程类型',
        otherOptions: {
          disabled: true
        },
        rules: [
          {
            required: true,
            message: '请选择流程类型',
            trigger: ['blur', 'change']
          }
        ]
      },
      {
        label: '流程应用:',
        type: 'select',
        field: 'businessType',
        options: business.value,
        optionsKey: 'code',
        optionsValueKey: 'desc',
        placeholder: '请选择流程应用',
        rules: [
          {
            required: true,
            message: '请选择流程应用',
            trigger: ['blur', 'change']
          }
        ]
      },
      // {
      //   label: '关联功能模块:',
      //   type: 'select',
      //   field: 'flowScene',
      //   options: scene.value,
      //   optionsKey: 'code',
      //   optionsValueKey: 'desc',
      //   placeholder: '请选择关联流程模块',
      //   rules: [
      //     {
      //       required: true,
      //       message: '请选择流程应用',
      //       trigger: ['blur', 'change']
      //     }
      //   ]
      // },
      {
        label: '流程说明:',
        type: 'input',
        field: 'flowDesc',
        otherOptions: {
          maxlength: '100',
          type: 'textarea',
          'show-word-limit': true
        },
        placeholder: '请输入流程说明'
      },
      {
        label: '流程完成后',
        type: 'customSlot',
        field: 'flowEvent',
        slotName: 'flowEvent'
      }
    ]
  })

  return {
    useEditFormItem
  }
}
