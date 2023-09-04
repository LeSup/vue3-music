<template>
  <main class="main rank" v-loading="state.loading">
    <BaseScroll>
      <ul class="list">
        <li class="item" v-for="item of state.ranks" :key="item.id" @click="handleClick(item)">
          <img class="image" v-lazy="item.pic" alt="" />
          <ul class="songs">
            <li class="song" v-for="(song, index) of item.songList" :key="song.id">
              <p class="text">{{ index + 1 }}.{{ song.singerName }}-{{ song.songName }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </BaseScroll>
    <RouterView />
  </main>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRank } from '@/services/rank'
import useRankStore from '@/stores/rank'

const router = useRouter()
const rankStore = useRankStore()

defineOptions({
  name: 'ViewRank'
})

const state = reactive({
  ranks: [],
  loading: false
})

onMounted(async () => {
  state.loading = true
  const { topList } = await getRank()
  state.ranks = topList
  state.loading = false
})

function handleClick(item) {
  rankStore.setRank(item)
  router.push(`/rank/${item.id}`)
}
</script>

<style lang="less" scoped>
.rank {
  .list {
    padding: 20px 0;
  }
  .item {
    display: flex;
    place-items: center;
    column-gap: 20px;
    margin: 0 20px;
    background-color: var(--color-highlight-background);
    &:not(.last-child) {
      margin-bottom: 20px;
    }
    .image {
      .square(100px);
    }
    .songs {
      flex: 1;
      font-size: var(--font-size-small);
      line-height: 1.4;
      text-align: left;
      color: var(--color-text-d);
    }
    .song {
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
}
</style>
