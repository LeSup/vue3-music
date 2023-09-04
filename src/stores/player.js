import { defineStore } from 'pinia'
import shuffle from '@/utils/shuffle'

export const PlayMode = {
  sequence: 0,
  random: 1,
  loop: 2
}

export default defineStore('player', {
  state: () => ({
    playList: [],
    songList: [],
    playing: false,
    playMode: PlayMode.sequence,
    playIndex: -1
  }),
  getters: {
    playingSong(state) {
      return state.playList[state.playIndex] || {}
    }
  },
  actions: {
    randomPlay(songs) {
      this.playList = shuffle(songs)
      this.songList = songs
      this.playing = true
      this.playMode = PlayMode.random
      this.playIndex = 0
    },
    selectPlay(index, songs) {
      this.playList = songs
      this.songList = songs
      this.playing = true
      this.playMode = PlayMode.sequence
      this.playIndex = index
    },
    setPlaying(bool) {
      this.playing = bool
    }
  }
})
