import { defineStore } from 'pinia'

export default defineStore('rank', {
  state: () => ({
    rank: null
  }),
  actions: {
    setRank(rank) {
      this.rank = rank
    }
  }
})
