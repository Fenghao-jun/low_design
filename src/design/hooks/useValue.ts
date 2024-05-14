import { ref, watch } from 'vue'

export default function useValue(props: any) {
  const _value = ref(props.value)
  watch(
    props,
    (newValue) => {
      _value.value = newValue.value
    },
    { once: true }
  )
  return _value
}
