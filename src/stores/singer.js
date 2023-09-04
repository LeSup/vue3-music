import { defineStore } from 'pinia'

export default defineStore('singer', {
  state: () => ({ singer: null }),
  actions: {
    setSinger(singer) {
      this.singer = singer
    }
  }
})
