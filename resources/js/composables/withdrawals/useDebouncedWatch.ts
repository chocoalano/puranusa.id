// resources/js/composables/withdrawals/useDebouncedWatch.ts
import { watch, type WatchSource } from 'vue'

export function useDebouncedWatch(
  sources: WatchSource | WatchSource[],
  cb: () => void,
  delay = 300
) {
  let t: ReturnType<typeof setTimeout> | null = null

  watch(
    sources,
    () => {
      if (t) clearTimeout(t)
      t = setTimeout(cb, delay)
    },
    { deep: true }
  )
}
