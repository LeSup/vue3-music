<template>
  <MusicList :data="songs" :pic="singerStore.singer?.pic" :title="singerStore.singer?.name" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MusicList from '@/components/MusicList/index.vue'
import useSingerStore from '@/stores/singer'
import { getSingerDetail } from '@/services/singer'
import { processSongs } from '@/services/song'

const router = useRouter()
const singerStore = useSingerStore()

defineOptions({
  name: 'ViewSingerDetail'
})

const songs = ref([])

onMounted(async () => {
  if (!singerStore.singer) {
    router.go(-1)
    return
  }

  const result = await getSingerDetail(singerStore.singer)
  songs.value = await processSongs(result.songs)
})
</script>
