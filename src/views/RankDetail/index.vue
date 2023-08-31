<template>
  <MusicList :data="songs" :pic="rankStore.rank?.pic" :title="rankStore.rank?.name" rank />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MusicList from '@/components/MusicList/index.vue'
import useRankStore from '@/stores/rank'
import { getRankDetail } from '@/services/rank'
import { processSongs } from '@/services/song'

const songs = ref([])
const router = useRouter()
const rankStore = useRankStore()

onMounted(async () => {
  if (!rankStore.rank) {
    router.go(-1)
    return
  }

  const result = await getRankDetail(rankStore.rank)
  songs.value = await processSongs(result.songs)
})
</script>

<style></style>
