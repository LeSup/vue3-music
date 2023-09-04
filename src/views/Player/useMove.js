import { ref } from 'vue'

const maxWidth = window.innerWidth
const Dirs = ['left', 'right']

export const ActiveList = ['disc', 'lyric']

export default function useMove(state) {
  const moveLeft = ref(null)
  const moveRight = ref(null)

  let touch

  function handleTouchStart(e) {
    touch = {
      clientX: e.touches[0].clientX
    }
  }

  function handleTouchMove(e) {
    if (touch) {
      const { clientX } = touch
      const deltaX = e.touches[0].clientX - clientX
      const active = ActiveList[state.active]

      let o, x
      if (deltaX < 0 && active === ActiveList[0]) {
        touch.dir = Dirs[0]
        x = Math.max(-maxWidth, deltaX)
        o = Math.max(0, 1 + deltaX / maxWidth)
      } else if (deltaX > 0 && active === ActiveList[1]) {
        touch.dir = Dirs[1]
        x = Math.min(deltaX - maxWidth, 0)
        o = Math.min(deltaX / maxWidth, 1)
      } else {
        delete touch.dir
      }

      if (touch.dir) {
        touch.deltaX = deltaX
        setStyle(o, x, false)
      }
    }
  }

  function handleTouchEnd() {
    if (touch?.dir) {
      const { dir, deltaX } = touch
      const p = Math.abs(deltaX / maxWidth)

      let o, x
      if ((dir === Dirs[0] && p <= 0.2) || (dir === Dirs[1] && p > 0.2)) {
        x = 0
        o = 1
      }
      if ((dir === Dirs[0] && p > 0.2) || (dir === Dirs[1] && p <= 0.2)) {
        x = -maxWidth
        o = 0
      }

      state.active = x < 0 ? 1 : 0
      setStyle(o, x, true)
    }
    touch = null
  }

  function setStyle(o, x, a) {
    const transition = a ? 'all 0.3s' : 'unset'
    moveLeft.value.style.opacity = o
    moveRight.value.style.transform = `translateX(${x}px)`
    moveLeft.value.style.transition = transition
    moveRight.value.style.transition = transition
  }

  return {
    moveLeft,
    moveRight,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
