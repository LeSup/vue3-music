<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

defineOptions({
  name: 'BaseScroll'
})

const emit = defineEmits(['scroll'])

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})

const scroll = ref(null)

let bs = null
onMounted(() => {
  bs = new BScroll(scroll.value, {
    observeDOM: true,
    ...props
  })

  bs.on('scroll', (position) => {
    emit('scroll', position)
  })
})

onBeforeUnmount(() => {
  bs.destroy()
})

defineExpose({
  refresh: () => bs.refresh(),
  scrollToElement: (...rest) => bs.scrollToElement(...rest)
})
</script>

<style lang="less" scoped>
.scroll {
  height: 100%;
}
</style>
