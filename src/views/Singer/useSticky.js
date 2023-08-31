import { ref, watch, computed, nextTick } from 'vue'

const TitleHeight = 30

export default function useSticky(state, group) {
  const translateY = ref(0)
  const title = computed(() => state.singers[state.index]?.title || '')
  const transform = computed(() => ({ transform: `translateY(${translateY.value}px)` }))

  watch(
    () => state.singers,
    () => {
      nextTick(calcGroupHeight)
    }
  )

  let groupHeight = []

  function handleScroll(position) {
    const { y } = position
    const heights = groupHeight
    const len = heights.length

    let idx = len - 1,
      tY = 0

    if (y > 0) {
      idx = -1
    } else {
      for (let i = 0; i < len - 1; i++) {
        const cur = heights[i],
          next = heights[i + 1]
        if (-y >= cur && -y < next) {
          idx = i

          // 剩余高度
          const leftHeight = next + y
          // leftHeight > TitleHeight 时，取 0
          // leftHeight < leftHeight 时，取 leftHeight - TitleHeight
          tY = Math.min(0, leftHeight - TitleHeight)
        }
      }
    }

    state.index = idx
    translateY.value = tY
  }

  function calcGroupHeight() {
    const val = group.value
    groupHeight = val.reduce(
      (res, cur) => {
        const prev = res[res.length - 1]
        res.push(prev + cur.clientHeight)
        return res
      },
      [0]
    )
  }

  return {
    title,
    group,
    transform,
    handleScroll
  }
}
