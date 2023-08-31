<template>
  <main class="main" v-loading="state.loading">
    <BaseScroll ref="scroll" :probeType="3" @scroll="handleScroll">
      <ul class="name-list">
        <li class="name-group" ref="group" v-for="item of state.singers" :key="item.title">
          <h2 class="name-title">{{ item.title }}</h2>
          <ul class="singer-list">
            <li
              class="singer-item"
              v-for="singer of item.list"
              :key="singer.id"
              @click="handleClick(singer)"
            >
              <img class="image" v-lazy="singer.pic" alt="" />
              <p class="name">{{ singer.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </BaseScroll>
    <div class="shortcut">
      <ul
        class="list"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <li
          class="item"
          v-for="(item, index) of state.singers"
          :key="item.title"
          :data-index="index"
          :class="getActiveCls(index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="sticky" v-show="title" :style="transform">{{ title }}</div>
    <RouterView></RouterView>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSingerList } from '@/services/singer'
import useSingerStore from '@/stores/singer'
import useSticky from './useSticky'
import useShortcut from './useShortcut'

const router = useRouter()
const singerStore = useSingerStore()

const scroll = ref(null)
const group = ref(null)
const state = reactive({
  loading: false,
  singers: [],
  index: 0
})

onMounted(async () => {
  state.loading = true
  const { singers } = await getSingerList()
  state.singers = singers
  state.loading = false
})

function getActiveCls(i) {
  let idx = state.index
  idx = idx < 0 ? 0 : idx
  return { active: i === idx }
}

function handleClick(item) {
  singerStore.setSinger(item)
  router.push(`/singer/${item.id}`)
}

const { title, transform, handleScroll } = useSticky(state, group)
const { handleTouchStart, handleTouchMove, handleTouchEnd } = useShortcut(state, scroll, group)
</script>

<style lang="less" scoped>
.sticky,
.name-title {
  padding-left: 20px;
  height: 30px;
  font-size: var(--font-size-small);
  line-height: 30px;
  color: var(--color-text-l);
  background-color: var(--color-highlight-background);
}
.sticky {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.singer-list {
  padding: 20px 0;
}
.singer-item {
  display: flex;
  place-items: center;
  column-gap: 20px;
  padding: 0 30px;
  &:not(:last-child) {
    padding-bottom: 20px;
  }
  .image {
    .square(50px);
    border-radius: 25px;
  }
  .name {
    flex: 1;
    min-width: 0;
    font-size: var(--font-size-medium);
    color: var(--color-text-l);
    .ellipsis();
  }
}
.shortcut {
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  padding: 10px 0;
  border-radius: 10px;
  background-color: var(--color-background-d);
  .list {
    width: 20px;
    text-align: center;
  }
  .item {
    height: 20px;
    font-size: var(--font-size-medium);
    line-height: 20px;
    color: var(--color-text-l);
    &.active {
      color: var(--color-theme);
    }
  }
}
</style>
