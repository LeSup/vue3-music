<template>
  <div class="slider">
    <div class="track" ref="track" @click.stop="handleClick">
      <div class="progress" :style="progressStyle"></div>
    </div>
    <div
      class="thumb"
      :style="thumbStyle"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'

defineOptions({
  name: 'BaseSlider'
})

const emit = defineEmits(['change'])

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})

const offsetX = ref(0)
const track = ref(null)

watch(
  () => props.progress,
  (val) => {
    // 避免干扰滑动
    if (touch) {
      return
    }

    offsetX.value = val * trackWidth
  }
)

let trackWidth
onMounted(() => {
  // 能拿到 dom，但是拿不到位置信息，需要 nextTick 后获取
  nextTick(() => {
    trackWidth = track.value.clientWidth
  })
})

const progressStyle = computed(() => {
  const val = offsetX.value
  return {
    right: `${trackWidth ? ((trackWidth - val) * 100) / trackWidth : 100}%`
  }
})
const thumbStyle = computed(() => ({
  transform: `translateX(${offsetX.value}px)`
}))

function handleClick(e) {
  offsetX.value = e.offsetX
  emit('change', Math.min(1, e.offsetX / trackWidth))
}

let touch
function handleTouchStart(e) {
  touch = {
    ox: offsetX.value,
    clientX: e.touches[0].clientX
  }
}

function handleTouchMove(e) {
  if (touch) {
    const { ox, clientX } = touch
    const deltaX = e.touches[0].clientX - clientX

    touch.x = Math.max(0, Math.min(ox + deltaX, trackWidth))
    offsetX.value = touch.x
  }
}

function handleTouchEnd() {
  if (touch.x) {
    emit('change', Math.min(1, touch.x / trackWidth))
  }
  touch = null
}
</script>

<style lang="less" scoped>
.slider {
  position: relative;
  height: 16px;
  padding: 0 8px;
  .track {
    position: relative;
    margin-top: 6px;
    height: 4px;
    border-radius: 2px;
    background-color: var(--color-highlight-background);
    overflow: hidden;
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: var(--color-theme);
    }
  }
  .thumb {
    position: absolute;
    top: 0;
    left: 0;
    .square(16px);
    border: 3px solid var(--color-text);
    border-radius: 50%;
    box-sizing: border-box;
    background-color: var(--color-theme);
  }
}
</style>
