<template>
  <div class="player" v-show="playerStore.playList.length">
    <div class="normal" v-show="state.fullscreen">
      <div class="pic" :style="picStyle">
        <div class="pic-blur"></div>
      </div>
      <div class="header">
        <i class="icon icon-back" @click="toggleFullscreen"></i>
        <h1 class="title">{{ playerStore.playingSong.name }}</h1>
        <h2 class="subtitle">{{ playerStore.playingSong.singer }}</h2>
      </div>
      <div class="main">
        <div
          class="move"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div class="move-left" ref="moveLeft">
            <div class="disc-placeholder">
              <div class="disc-wrapper">
                <img class="image" :class="discCls" :src="playerStore.playingSong.pic" alt="" />
              </div>
            </div>
          </div>
          <div class="move-right" ref="moveRight">歌詞</div>
        </div>
        <ul class="dots">
          <li
            class="dot"
            v-for="(item, index) of ActiveList"
            :key="item"
            :class="getActiveCls(index)"
          ></li>
        </ul>
      </div>
      <div class="footer">
        <div class="control" v-if="playerStore.playList.length">
          <div class="time">{{ format(state.currentTime) }}</div>
          <BaseSlider :progress="progress" @change="handleSliderChange" />
          <div class="time">{{ format(playerStore.playingSong.duration) }}</div>
        </div>
        <div class="operate">
          <i class="icon icon-random"></i>
          <i class="icon icon-prev"></i>
          <i class="icon" :class="playingCls" @click="togglePlaying"></i>
          <i class="icon icon-next"></i>
          <i class="icon icon-playlist"></i>
        </div>
      </div>
    </div>
    <div class="mini" v-show="!state.fullscreen" @click="toggleFullscreen"></div>
    <audio
      ref="audio"
      :src="playerStore.playingSong.url"
      @loadeddata="handleLoadedData"
      @timeupdate="handleTimeUpdate"
      @error="handleError"
      @ended="handleEnded"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import usePlayerStore from '@/stores/player'
import useMove, { ActiveList } from './useMove'
import useAudio from './useAudio'
import { format } from '@/utils/time'

const playerStore = usePlayerStore()

defineOptions({
  name: 'ViewPlayer'
})

const state = reactive({
  fullscreen: true,
  active: 0,
  currentTime: 0
})

const picStyle = computed(() => ({
  'background-image': `url(${playerStore.playingSong.pic})`
}))
const discCls = computed(() => [playerStore.playing ? 'running' : 'paused'])
const playingCls = computed(() => [playerStore.playing ? 'icon-play' : 'icon-pause'])
const progress = computed(() => {
  const d = playerStore.playingSong.duration
  return d ? Math.min(1, state.currentTime / d) : 0
})

function getActiveCls(index) {
  return { active: index === state.active }
}

function toggleFullscreen() {
  state.fullscreen = !state.fullscreen
}

const { moveLeft, moveRight, handleTouchStart, handleTouchMove, handleTouchEnd } = useMove(state)
const {
  audio,
  togglePlaying,
  handleLoadedData,
  handleTimeUpdate,
  handleError,
  handleEnded,
  handleSliderChange
} = useAudio(state, playerStore)
</script>

<style lang="less" scoped>
.player {
  .normal {
    position: fixed;
    inset: 0;
    .pic {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      &-blur {
        height: 100%;
        background-color: var(--color-background-l);
        .backdrop-filter-blur(10px);
      }
    }
    .header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 0 44px;
      .icon {
        position: absolute;
        top: 12px;
        left: 12px;
        font-size: 20px;
        color: var(--color-theme);
        transform: rotate(-90deg);
      }
      .title {
        height: 44px;
        font-size: var(--font-size-large);
        line-height: 44px;
        text-align: center;
        .ellipsis();
      }
      .subtitle {
        font-size: var(--font-size-medium);
        line-height: 16px;
        text-align: center;
        .ellipsis();
      }
    }
    .main {
      position: absolute;
      inset: 60px 0 calc(96px + 10vw);
      padding-top: 10vw;
      padding-bottom: 20px;
      .move {
        display: flex;
        height: 100%;
        width: max-content;
        &-left,
        &-right {
          height: 100%;
          width: 100vw;
          overflow: hidden;
        }
        .disc-placeholder {
          position: relative;
          margin: 0 10vw;
          padding-top: 80vw;
          .disc-wrapper {
            position: absolute;
            inset: 0;
            .image {
              display: block;
              .square(100%);
              border-radius: 50%;
              border: 10px solid var(--color-text-l);
              box-sizing: border-box;
              animation: rotate 10s linear infinite;
              &.paused {
                animation-play-state: paused;
              }
              &.running {
                animation-play-state: running;
              }
            }
          }
        }
      }
      .dots {
        position: absolute;
        bottom: 6px;
        left: 50%;
        display: flex;
        column-gap: 4px;
        transform: translateX(-50%);
        .dot {
          .square(8px);
          background-color: var(--color-text-l);
          border-radius: 4px;
          transition: all 0.1s;
          &.active {
            width: 16px;
            background-color: var(--color-text);
          }
        }
      }
    }
    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 10vw 0;
      .control {
        display: flex;
        place-content: space-between;
        place-items: center;
        column-gap: 8px;
        margin: 0 10vw;
        .time {
          font-size: var(--font-size-small);
          color: var(--color-text);
        }
        :deep(.slider) {
          flex: 1;
        }
      }
      .operate {
        display: flex;
        place-content: space-between;
        place-items: center;
        margin: 20px 10vw 0;
        font-size: 30px;
        color: var(--color-theme);
        .icon:nth-child(3) {
          font-size: 40px;
        }
      }
    }
  }
  .mini {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background-color: var(--color-highlight-background);
  }
}
</style>
