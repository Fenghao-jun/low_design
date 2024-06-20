<template>
  <div ref="containerRef"></div>
  <ContentMenu ref="menuRef" :position="menuPosition" />
</template>

<script setup lang="ts">
import { Graph, TreeGraph } from '@antv/g6'
import { onMounted, ref } from 'vue'
import { registerLines } from './lines'
import { registerNodes } from './nodes'
import { defaultLayout } from './default-layout'
import { data } from './data'
import { getTreeDepth } from './utils'
import { cloneDeep } from 'lodash-es'
import ContentMenu from './ContentMenu.vue'

// 注册线
registerLines()
registerNodes()

// 下拉菜单
const menuRef = ref<InstanceType<typeof ContentMenu>>()

const menuPosition = ref({
  top: 0,
  left: 0
})

const openMenu = () => {
  menuRef.value?.showDropDown()
}

const closeMenu = () => {
  menuRef.value?.hiddenDropDown()
}

// 实例
const graphInstance = ref<Graph>()
const containerRef = ref<HTMLElement>()

onMounted(() => {
  const { width = 300 } = containerRef?.value?.getBoundingClientRect() || {}
  const depth = getTreeDepth(data)

  const graph = new TreeGraph({
    container: containerRef.value!,
    width,
    height: depth * 40 + 56 * (depth - 1) + 200,
    layout: defaultLayout,
    linkCenter: true,
    defaultNode: {
      type: 'start'
    },
    animateCfg: {
      duration: 150
    }
  })

  graphInstance.value = graph

  graph.on('afteradditem', () => {
    const newData = graph.save()
    const depth = getTreeDepth(newData)
    graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200)
  })

  graph.on('afterremoveitem', () => {
    const newData = graph.save()
    const depth = getTreeDepth(newData)
    graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200)
  })

  graph.edge((config: any) => {
    // TODO  如果是条件节点，则取条件名称

    // // 获取线的源节点和目标节点
    // const sourceNode: any = graph.findById(config.source);
    // const targetNode: any = graph.findById(config.target);

    // // 获取源节点和目标节点的配置
    // const sourceModel = sourceNode?.getModel();
    // const targetModel = targetNode?.getModel();

    // const label = '';

    // if (sourceModel?.type === 'condition') {
    //   const { name } = sourceModel?.config?.find((o: any) => o.id === targetModel?.conditionId) || {};
    //   label = name;
    // }

    return {
      type: 'flow-line',
      label: '',
      style: {
        stroke: '#91d5ff'
      }
    } as any
  })

  graph.data(cloneDeep(data))
  graph.render()
  graph.fitCenter()

  graph.on('node:click', (evt: any) => {
    console.log('evt: ', evt)
    const { item, target } = evt
    const targetType = target.get('type')
    const name = target.get('name')
    const model = item.getModel()

    // if (['action', 'condition'].includes(model.type) && targetType !== 'marker') {
    //   curModel.current = item.getModel();
    //   setSettingOpen(true);
    //   setMenuOpen(false);
    //   return;
    // }

    // if (model.id === curModel.current?.id) {
    //   return;
    // }

    // setMenuOpen(false);

    if (targetType === 'marker' && name === 'add-item') {
      // 获取当前节点的位置
      const itemBox = item.getBBox()
      // 获取当前节点的子节点位置
      const bbox = target.getBBox()
      // 获取当前节点在画布上的位置
      const newBox = graph.getCanvasByPoint(
        bbox.x + itemBox.x + itemBox.width / 2 + 20,
        bbox.y + itemBox.y + itemBox.height / 2 + 6
      )

      // curModel.current = item.getModel();

      const { left = 0, top = 0 } =
        containerRef?.value?.getBoundingClientRect() || {}

      setTimeout(() => {
        // setPosition({
        //   top: newBox.y + top,
        //   left: newBox.x + left,
        // });
        // setMenuOpen(true);
        menuPosition.value = {
          top: newBox.y + top,
          left: newBox.x + left
        }
        console.log('menuPosition: ', menuPosition)

        openMenu()
      }, 10)
    } else if (name === 'remove-item') {
      graph.removeChild(model.id)
    }
  })

  graph.on('canvas:click', () => {
    closeMenu()
  })
})
</script>

<style scoped></style>
