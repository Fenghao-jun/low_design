import { computed, Ref } from 'vue'
// import { IFromItem } from 'am-admin-component'

export const useEditForm = (formData, templateList: Ref<any[]>) => {
  const useEditFormItem = computed<any[]>(() => {
    return [
      {
        label: '流程节点标题:',
        type: 'input',
        field: 'name',
        otherOptions: {
          maxlength: '20',
          'show-word-limit': true
        },
        placeholder: '请输入流程节点标题',
        rules: [
          {
            required: true,
            message: '请输入流程节点标题',
            trigger: ['blur', 'change']
          }
        ]
      },
      {
        label: '关联表单:',
        type: 'select',
        field: 'type',
        options: templateList.value,
        optionsKey: 'templateId',
        optionsValueKey: 'templateName',
        placeholder: '请选择关联表单'
        // rules: [
        //   {
        //     required: true,
        //     message: '请选择关联表单',
        //     trigger: ['blur', 'change']
        //   }
        // ]
      }
      // {
      //   label: '发起对象:',
      //   type: 'customSlot',
      //   slotName: 'launch',
      //   field: 'launch'
      // }
    ]
  })

  return {
    useEditFormItem
  }
}
