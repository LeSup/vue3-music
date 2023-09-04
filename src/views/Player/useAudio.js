import { ref } from 'vue'

export default function useAudio(state, playerStore) {
  const audio = ref(null)

  function togglePlaying() {
    const { playing } = playerStore
    if (playing) {
      playerStore.setPlaying(false)
      audio.value.pause()
    } else {
      playerStore.setPlaying(true)
      audio.value.play()
    }
  }

  function handleLoadedData(e) {
    e.target.play()
  }

  function handleTimeUpdate(e) {
    state.currentTime = e.target.currentTime
  }

  function handleError() {
    // 暂停播放
    // 提示错误
  }

  function handleEnded() {
    // 单曲循环，重新播放
    // 否则切换到下一首
  }

  function handleSliderChange(progress) {
    audio.value.currentTime = progress * playerStore.playingSong.duration
    playerStore.setPlaying(true)
    audio.value.play()
  }

  return {
    audio,
    togglePlaying,
    handleLoadedData,
    handleTimeUpdate,
    handleError,
    handleEnded,
    handleSliderChange
  }
}
