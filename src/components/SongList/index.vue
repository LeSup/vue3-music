<template>
  <div class="song-list">
    <ul class="list">
      <li class="item" v-for="item of props.data" :key="item.id">
        <div class="content">
          <p class="name">{{ item.name }}</p>
          <p class="desc">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
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
    padding: 0 20px;
    &:not(:last-child) {
      margin-bottom: 20px;
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
