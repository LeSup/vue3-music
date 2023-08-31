import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('album', () => {
  const album = ref(null)

  function setAlbum(value) {
    album.value = value
  }

  return { album, setAlbum }
})
