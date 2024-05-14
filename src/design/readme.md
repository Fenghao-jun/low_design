## 如何规范的开发一个组件

### 1.组件目录

组件应该放在`/design/components/`文件夹下面，**必须要有`index.ts`文件，文件中默认导出一个component(即组件本身)，一个componentConfig(需满足类型EditorComponentConfig)**

```tsx
export default {
  component: Button,
  componentConfig
}
```

项目会自动根据组件中的`index.ts`自动注册组件，**注册的名字为存放组件的文件夹名字**


## 常见问题排查指南

### 组件没渲染出来
检查`Scheme`中的`type`是否对上注册的组件名(即组件文件夹名字)
