<template>
  <div>
    <template v-if="loading"> loading </template>
    <template v-else>
      <HelloWorld
        :msg="msg"
        :count="count"
        @click="msg = msg.toUpperCase()"
        @add="count++"
      ></HelloWorld>
    </template>
  </div>
</template>

<script setup lang="ts" name="RemoteComponent">
import { defineAsyncComponent, ref } from 'vue'

const loading = ref(false)
const msg = ref('hello 111')
const count = ref(1)
const HelloWorld = defineAsyncComponent(() =>
  import('components/Button.vue').finally(() => {
    loading.value = false
  })
)
</script>

<style scoped></style>
