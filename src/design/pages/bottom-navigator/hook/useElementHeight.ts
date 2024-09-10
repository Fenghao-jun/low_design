import { ref, onMounted } from 'vue'

export default function useElementHeight() {
  const elementRef = ref(null)
  const height = ref(0)
  const setHeight = (el) => {
    if (el) {
      height.value = el.offsetHeight
    }
  }
  const observeHeight = (el) => {
    const observer = new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        height.value = entry.target.offsetHeight
      }
    })
    if (el) {
      observer.observe(el)
    }
    return () => {
      observer.disconnect()
    }
  }

  onMounted(() => {
    if (elementRef.value) {
      setHeight(elementRef.value)
      observeHeight(elementRef.value)
    }
  })
  // onUnmounted(() => {
  // })
  return {
    elementRef,
    height
  }
}
