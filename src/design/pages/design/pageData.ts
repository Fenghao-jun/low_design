export const pageData = {
  components: [
    {
      key: 'Form',
      props: {
        formProps: {
          model: {
            id: 0,
            cueTypeStatus: 'market',
            name: '321312',
            qqNumber: '1870292016',
            wxAccount: 'ikikik',
            emailAddress: '1870292016@qq.com',
            respectfully: 'MISS',
            telephone: '15622645132'
          }
        }
      },
      children: [
        {
          key: 'Radio',
          name: '线索类型',
          props: {
            enums: [
              {
                label: '公共线索',
                value: 'public'
              },
              {
                label: '销售线索',
                value: 'market'
              }
            ],
            fieldKey: 'cueTypeStatus',
            formItemProps: {
              prop: 'cueTypeStatus',
              label: '线索类型：',
              labelWidth: '120'
            }
          },
          componentId: 11,
          description: '下拉选择器'
        },
        {
          key: 'Input',
          name: '输入框',
          props: {
            rules: [
              {
                message: '请输入联系人姓名',
                trigger: ['blur'],
                required: true
              }
            ],
            fieldKey: 'name',
            placeholder: '请输入供应商编码',
            formItemProps: {
              prop: 'name',
              label: '联系人姓名：',
              labelWidth: '120'
            }
          },
          componentId: 12,
          description: '输入框'
        },
        {
          key: 'Radio',
          name: '输入框',
          props: {
            rules: [
              {
                message: '请选择尊称',
                trigger: ['blur']
              }
            ],
            fieldKey: 'respectfully',
            placeholder: '请选择尊称',
            formItemProps: {
              prop: 'respectfully',
              label: '尊称：',
              labelWidth: '120'
            },
            enums: [
              {
                label: '未知',
                value: 'UNKNOWN'
              },
              {
                label: '先生',
                value: 'SIR'
              },
              {
                label: '女士',
                value: 'MISS'
              }
            ]
          },
          componentId: 13,
          description: '输入框'
        },
        {
          key: 'Input',
          name: '输入框',
          props: {
            rules: [
              {
                message: '请输入联系人电话',
                trigger: ['blur'],
                required: true
              }
            ],
            fieldKey: 'telephone',
            formItemProps: {
              prop: 'telephone',
              label: '手机号码：',
              labelWidth: '120'
            }
          },
          componentId: 15,
          description: '输入框'
        },
        {
          key: 'Input',
          name: '输入框',
          props: {
            fieldKey: 'wxAccount',
            formItemProps: {
              prop: 'wxAccount',
              label: '微信帐号：',
              labelWidth: '120'
            }
          },
          componentId: 16,
          description: '输入框'
        },
        {
          key: 'Input',
          name: '输入框',
          props: {
            fieldKey: 'emailAddress',
            formItemProps: {
              prop: 'emailAddress',
              label: '电子邮箱：',
              labelWidth: '120'
            }
          },
          componentId: 17,
          description: '输入框'
        },
        {
          key: 'Input',
          name: '输入框',
          props: {
            fieldKey: 'qqNumber',
            formItemProps: {
              prop: 'qqNumber',
              label: 'QQ号码：',
              labelWidth: '120'
            }
          },
          componentId: 18,
          description: '输入框'
        }
      ],
      componentId: 1
    }
  ],
  service: '1',
  name: '11',
  pageData: [
    {
      name: 'currentHandleId',
      remark: '当前操作的id',
      defaultValue: ''
    },
    {
      name: 'currentTab',
      remark: '当前tab的索引',
      defaultValue: 'all'
    }
  ],
  pageId: '1'
}
