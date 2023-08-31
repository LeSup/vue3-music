import { ref } from 'vue'

const PicHeight = window.innerWidth * 0.7
const HeaderHeight = 44
const MaxBlur = 10

export default function useScroll() {
  const blur = ref(0)
  const scale = ref(1)
  const fixed = ref(false)

  function handleScroll({ y }) {
    let s = 1,
      b = 0

    if (y < 0) {
      b = Math.min(MaxBlur, MaxBlur * (-y / (PicHeight - HeaderHeight)))
    } else {
      s = 1 + Math.min(y / PicHeight, 1)
    }

    blur.value = b
    scale.value = s
    fixed.value = b === MaxBlur
  }

  return { blur, scale, fixed, handleScroll }
}
