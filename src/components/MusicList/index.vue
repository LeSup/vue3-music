<template>
  <Transition appear name="slide">
    <div class="music-list">
      <div class="header">
        <i class="icon icon-back" @click="handleBack"></i>
        <h2 class="title">{{ props.title }}</h2>
      </div>
      <div class="pic" :class="picCls" :style="picStyle">
        <div class="pic-blur" :style="blurStyle"></div>
        <div class="pic-button" v-show="!fixed">
          <BaseButton text="随机播放全部" @click="handleClickButton">
            <i class="icon icon-play"></i>
          </BaseButton>
        </div>
      </div>
      <div class="container" v-loading="state.loading">
        <BaseScroll :probeType="3" @scroll="handleScroll">
          <SongList :data="props.data" :rank="props.rank" />
        </BaseScroll>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import SongList from '@/components/SongList/index.vue'
import usePlayerStore from '@/stores/player'
import useScroll from './useScroll'

const router = useRouter()
const playerStore = usePlayerStore()

defineOptions({
  name: 'MusicList'
})

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  pic: String,
  title: String,
  rank: Boolean
})

const state = reactive({ loading: true })

const picCls = computed(() => ({ fixed: fixed.value }))
const picStyle = computed(() => ({
  'background-image': `url(${props.pic})`,
  transform: `scale(${scale.value})`
}))
const blurStyle = computed(() => ({
  'backdrop-filter': `blur(${blur.value}px)`,
  '-webkit-backdrop-filter': `blur(${blur.value}px)`
}))

watch(
  () => props.data,
  () => {
    nextTick(() => {
      state.loading = false
    })
  }
)

function handleBack() {
  router.go(-1)
}

function handleClickButton() {
  playerStore.randomPlay(props.data)
}

const { blur, scale, fixed, handleScroll } = useScroll()
</script>

<style lang="less" scoped>
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-background);

  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 44px;
    z-index: 2;
    .icon {
      position: absolute;
      top: 12px;
      left: 12px;
      font-size: 20px;
      color: var(--color-theme);
    }
    .title {
      padding: 0 44px;
      font-size: var(--font-size-large);
      line-height: 44px;
      color: var(--color-text);
      text-align: center;
      .ellipsis();
    }
  }
  .pic {
    position: relative;
    height: 70vw;
    background-size: 100%;
    transform-origin: top center;
    &.fixed {
      height: 44px;
      z-index: 1;
    }
    .pic-blur {
      position: absolute;
      inset: 0;
      background-color: var(--color-background-d);
    }
    .pic-button {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      display: flex;
      place-content: center;
    }
  }
  .container {
    position: absolute;
    top: 70vw;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
