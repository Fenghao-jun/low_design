## 如何规范的开发一个组件

TODO:导出一份符合规范的组件基本`Scheme`给可视化用
根据`index.ts`自动注册组件
组件统一从开发文件中的`index.ts`中进行导出，然后去到`/design-core/utils/component-regiter.ts`将组件进行注册。

## 常见问题排查指南

### 组件没渲染出来
`/design-core/utils/component-regiter.ts`下看看有没有注册对应的组件，并且`Scheme`中的`type`是否对上注册的组件名
