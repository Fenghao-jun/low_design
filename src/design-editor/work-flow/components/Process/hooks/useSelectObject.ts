import { computed, Ref } from 'vue'

interface SelectObjectData {
  userId?: string[]
  departId?: number[]
}

export const useSelectObject = (params: Ref<SelectObjectData>) => {
  const userNum = computed(() => {
    return params.value.userId ? `人员：${params.value.userId.length}人 }` : ''
  })

  const departNum = computed(() => {
    return params.value.departId
      ? `部门：${params.value.departId.length}个`
      : ''
  })

  return {
    userNum,
    departNum
  }
}
