<template>
  <MusicList :data="songs" :pic="albumStore.album?.pic" :title="albumStore.album?.title" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MusicList from '@/components/MusicList/index.vue'
import useAlbumStore from '@/stores/album'
import { getAlbum } from '@/services/recommend'
import { processSongs } from '@/services/song'

const router = useRouter()
const albumStore = useAlbumStore()

const songs = ref([])

onMounted(async () => {
  if (!albumStore.album) {
    router.go(-1)
    return
  }

  const result = await getAlbum(albumStore.album)
  songs.value = await processSongs(result.songs)
})
</script>

<style lang=""></style>
