<template>
  <div ref="containerRef">FlowEvent</div>
</template>

<script setup lang="ts">
import { Graph } from '@antv/g6'
import { onMounted, ref } from 'vue'
import { registerLines } from './lines'
import { registerNodes } from './nodes'

registerLines()
registerNodes()

const containerRef = ref()

const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2'
    }
  ]
}

const graphInstance = ref<Graph>()
onMounted(() => {
  graphInstance.value = new Graph({
    container: containerRef.value, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: 800, // Number，必须，图的宽度
    height: 500, // Number，必须，图的高度
    defaultNode: {
      type: 'circle',
      size: [100],
      color: '#5B8FF9',
      style: {
        fill: '#9EC9FF',
        lineWidth: 3
      },
      labelCfg: {
        style: {
          fill: '#fff',
          fontSize: 20
        }
      }
    },
    defaultEdge: {
      style: {
        stroke: '#e2e2e2'
      }
    }
  })

  graphInstance.value.data(data) // 读取 Step 2 中的数据源到图上
  graphInstance.value.render() // 渲染图
})
</script>

<style scoped></style>
