import { EditorComponentConfig } from '@/design-editor/flow-event/types'
import Button from './Button.vue'

const componentConfig: EditorComponentConfig = {
  name: '按钮',
  key: 'button',
  desc: '按钮组件',

  events: [
    {
      name: 'click',
      desc: '点击事件'
    }
  ],
  methods: [
    {
      name: 'showLoading',
      desc: '显示加载中'
    },
    {
      name: 'hideLoading',
      desc: '隐藏加载中'
    }
  ],

  setter: [
    {
      key: 'content',
      label: '显示内容',
      component: 'input'
    },

    {
      key: 'type',
      label: '按钮类型',
      component: 'select-v2',
      componentProps: {
        options: [
          { value: 'primary', label: 'primary' },
          { value: 'success', label: 'success' },
          { value: 'warning', label: 'warning' },
          { value: 'danger', label: 'danger' },
          { value: 'info', label: 'info' }
        ]
      }
    }
  ]
}

export { Button }

export default {
  component: Button,
  componentConfig
}
