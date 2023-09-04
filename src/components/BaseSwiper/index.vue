<template>
  <div class="swiper" ref="swiper">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

defineOptions({
  name: 'BaseSwiper'
})

const emit = defineEmits(['change'])

const swiper = ref(null)

let bs = null
onMounted(() => {
  bs = new BScroll(swiper.value, {
    scrollX: true,
    scrollY: false,
    slide: true,
    momentum: false,
    bounce: false,
    stopPropagation: true
  })

  bs.on('slideWillChange', (page) => {
    emit('change', page.pageX)
  })
})

onBeforeUnmount(() => {
  bs.destroy()
})
</script>

<style lang="less" scoped>
.swiper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
