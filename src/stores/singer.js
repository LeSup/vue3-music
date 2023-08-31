import { defineStore } from 'pinia'

export default defineStore('singer', {
  store: () => ({ singer: null }),
  actions: {
    setSinger(singer) {
      this.singer = singer
    }
  }
})
