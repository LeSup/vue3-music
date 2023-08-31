const LetterHeight = 20

export default function useShortcut(state, scroll, group) {
  let touch = null

  function handleTouchStart(e) {
    const i = +e.target.dataset.index

    touch = {
      clientY: e.touches[0].clientY,
      index: i
    }

    scrollToElement(i)
  }

  function handleTouchMove(e) {
    if (touch) {
      const deltaY = e.touches[0].clientY - touch.clientY
      let i = touch.index + Math.ceil(deltaY / LetterHeight)
      i = Math.max(0, Math.min(i, group.value.length - 1))

      scrollToElement(i)
    }
  }

  function handleTouchEnd() {
    touch = null
  }

  function scrollToElement(i) {
    state.index = i
    scroll.value.scrollToElement(group.value[i])
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
