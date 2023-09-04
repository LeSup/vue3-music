<template>
  <div class="song-list">
    <ul class="list">
      <li class="item" v-for="(item, index) of props.data" :key="item.id">
        <div class="rank" v-if="props.rank">{{ index + 1 }}</div>
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineOptions({
  name: 'SongList'
})

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  rank: Boolean
})

function getDesc(item) {
  const { album, singer } = item
  return singer + (album ? '-' + album : '')
}
</script>

<style lang="less" scoped>
.song-list {
  background-color: var(--color-background);
  .list {
    padding: 20px 0;
  }
  .item {
    display: flex;
    place-items: center;
    column-gap: 20px;
    padding: 0 20px;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    &:nth-child(1) .rank {
      color: transparent;
      .adapt-image('@/assets/images/first');
    }
    &:nth-child(2) .rank {
      color: transparent;
      .adapt-image('@/assets/images/second');
    }
    &:nth-child(3) .rank {
      color: transparent;
      .adapt-image('@/assets/images/third');
    }
    .rank {
      .square(26px);
      line-height: 26px;
      text-align: center;
      color: var(--color-theme);
      background-size: 100% 100%;
    }
    .content {
      flex: 1;
      min-width: 0;
      font-size: var(--font-size-medium);
      line-height: 1.2;
      .name {
        .ellipsis();
      }
      .desc {
        margin-top: 8px;
        color: var(--color-text-l);
        .ellipsis();
      }
    }
  }
}
</style>
