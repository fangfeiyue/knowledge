import { onMounted, onUnmounted, ref, Ref } from 'vue'

const useClickOutside = (elRef: Ref<null | HTMLElement>):Ref => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elRef.value) {
      if (elRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}

export default useClickOutside
