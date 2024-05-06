## 项目结构

```
|-- design 项目页面入口
	｜-- pages 页面
	｜-- component 关于低代码业务封装的ui
|-- design-code 低代码逻辑处理
	｜-- actions 事件处理
	｜-- render 包装物料和总render的入口
	｜-- types 类型
	｜-- utils 工具
		｜-- componentActionCenter 组件事件
		｜-- component-ref 渲染组件注册
		｜-- component-regiter 物料注册


```

TODO：补充文档

## 新增组件

### 通用组件

通用组件 由 `am-admin-design` 项目提供，代码位置：`src/design/components`, 可参考已有的组件代码

代码编写完成后在 `src/design-core/utils/component-regiter.ts` 下进行全局注册

```js
import { YourComponent } from '...'

ComponentRegisterCenter.register(componentName, YourComponent) // 这里的componenetName要对应JSON数据中的components成员中的key字段的value
```

### 非通用组件

非通用组件需要在另外的仓库 ['https://git.dataso.net/frontend_admin/am-admin-remote-component'](remote-component) 中编写

PS: 该仓库是一个 monorepo, 包管理使用 pnpm

#### 目录结构

```text
|-- packages 项目页面入口
	｜-- demo-vue-cli 该文件夹仅是一个实例，可参考
	｜-- [你的非通用代码的包名1]
	｜-- [你的非通用代码的包名2]
```

#### 新增的包需要引入 webpack 模块联邦

```js
// 你的 vue.config.js 文件

// 引入 模块联邦
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
	// ...
	// 配置webpack
	configureWebpack: {
		// 在此处  该非通用包项目 是处于提供方的位置
		new ModuleFederationPlugin({
			name: 'myComponent', // 可以理解为在消费方使用时的一个scope
			filename: 'remoteEntry.js', // build后在dist的文件名，最终在cdn中需要访问的文件，引入各包能统一最好，这里remoteEntry只是个例子
			exposes: {
				// ./component.vue 是相对于myComponent这个scope下的相对路径，最好能统一名称
				// 具体文件路径下 目前是集合所有你的组件进行一次性导出，具体参考 demo-vue-cli包
				"./components.vue": "具体文件路径",
			},
			shared: {
				// vue是作为共享模块使用
				// import:false是build构建时不会打包vue库
				vue: {
					import: false,
					singleton: true
				}
			}
		})
	}
	// ...
}
```

开发组件的时候，可以在自行在该包里自行调试，调试完成后，进行构建，构建出来一个 dist 包

##### 在本地进行试验查看

可以通过在本地起一个后端服务，如 express，来对 dist 包进行静态资源托管，前往 `am-admin-design` 进行调试查看效果

后续没有问题，上传到 cdn 给 `am-admin-design` 进行远程调用

## 如何在 am-admin-design 进行调用

同样需要在 `vue.config.js` 中引入模块联邦

```js
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
	// ...
	configureWebpack: {
		// 此处是作为消费方
		new ModuleFederationPlugin({
			remotes: {
				// 消费提供方的组件时
				// [当前使用的命名]: [消费方提供的name]@[域名]/[提供方定义的入口文件名称]
				// eg:
				// 		customComponet是在 am-admin-design使用你的组件的需要用到的定义
				// 		myComponent是上述提供方定义 name 的值
				// 		@后面是对应的你的调试地址或者是真正的cdn地址
				// 		remoteEntry.js是上述例子中定义的filename
				"customComponent": "myComponent@http://...../remoteEntry.js"
			},
			shared: {
				vue: {
					singleton: true
				}
			}
		})
	}
	// ...
}
```

### 如何引入

引入需要在 `src/design/components/RemoteComponent/index.vue` 文件下进行 `import` 引入

```js
// eg:
// demo_components 在上诉例子中 为 customComponent
// components.vue 是你提供方定义的文件名字，在上述例子中 为 components.vue
import('demo_components/components.vue')
  .then((res) => {
    registerBatch('demo', res.default)
  })
  .catch((err) => {
    console.log('[demo_components/components.vue]', err)
  })
```
