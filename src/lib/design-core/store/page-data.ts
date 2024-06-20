import { AnyObject } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageDataStore = defineStore('pageData', () => {
  const pageData = ref<AnyObject>({})

  const getData = () => {
    return pageData.value
  }

  const setData = (key: string, value: any) => {
    pageData.value = {
      ...pageData.value,
      [key]: value
    }
  }

  const mergeData = (value: AnyObject) => {
    pageData.value = {
      ...pageData.value,
      ...value
    }
  }

  const resetData = () => {
    pageData.value = {}
  }

  return {
    pageData,
    getData,
    setData,
    mergeData,
    resetData
  }
})
