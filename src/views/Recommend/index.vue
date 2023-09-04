<template>
  <main class="main" v-loading="state.loading">
    <BaseScroll>
      <div>
        <div class="swiper-placeholder">
          <div class="swiper-container">
            <template v-if="state.sliders.length">
              <BaseSwiper @change="handleSwiperChange">
                <ul class="swiper-list">
                  <li class="swiper-item" v-for="item of state.sliders" :key="item.id">
                    <img class="image" :src="item.pic" />
                  </li>
                </ul>
              </BaseSwiper>
              <ul class="swiper-dots">
                <li
                  class="swiper-dot"
                  v-for="(item, index) of state.sliders"
                  :key="item.id"
                  :class="getActiveCls(index)"
                ></li>
              </ul>
            </template>
          </div>
        </div>
        <div class="hot" v-show="!state.loading">
          <h2 class="title">热门推荐</h2>
          <ul class="list">
            <li class="item" v-for="item of state.albums" :key="item.id" @click="handleClick(item)">
              <img class="image" v-lazy="item.pic" alt="" />
              <div class="content">
                <p class="song">{{ item.title }}</p>
                <p class="singer">{{ item.username }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </BaseScroll>
    <RouterView />
  </main>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAlbumStore from '@/stores/album'
import { getRecommends } from '@/services/recommend'

const router = useRouter()
const albumStore = useAlbumStore()

defineOptions({
  name: 'ViewRecommend'
})

const state = reactive({
  loading: false,
  sliders: [],
  albums: [],
  current: 0
})

onMounted(async () => {
  state.loading = true
  const result = await getRecommends()
  const { sliders, albums } = result
  state.sliders = sliders
  state.albums = albums
  state.loading = false
})

function getActiveCls(index) {
  return {
    active: index === state.current
  }
}

function handleSwiperChange(current) {
  state.current = current
}

function handleClick(item) {
  albumStore.setAlbum(item)
  router.push(`/recommend/${item.id}`)
}
</script>

<style lang="less" scoped>
.swiper {
  &-placeholder {
    position: relative;
    padding-top: 40%;
  }
  &-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &-list {
    display: flex;
    height: 100%;
    width: max-content;
  }
  &-dots {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8px;
    display: flex;
    place-content: center;
    column-gap: 4px;
  }
  &-dot {
    .square(8px);
    background-color: var(--color-text-l);
    border-radius: 4px;
    &.active {
      width: 16px;
      background-color: var(--color-text);
    }
  }
  &-item {
    height: 100%;
    width: 100vw;
    .image {
      display: block;
      height: 100%;
      width: 100vw;
    }
  }
}
.hot {
  .title {
    height: 60px;
    font-size: var(--font-size-medium);
    line-height: 60px;
    text-align: center;
    color: var(--color-theme);
  }
  .item {
    display: flex;
    place-items: center;
    column-gap: 20px;
    padding: 0 20px 20px;
  }
  .image {
    .square(60px);
  }
  .content {
    flex: 1;
    min-width: 0;
    font-size: var(--font-size-medium);
    line-height: 20px;
    .song {
      color: var(--color-text);
      .ellipsis();
    }
    .singer {
      margin-top: 8px;
      color: var(--color-text-d);
      .ellipsis();
    }
  }
}
</style>
