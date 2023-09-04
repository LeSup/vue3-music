<template>
  <header class="top-bar">
    <div class="top-bar--content">
      <div class="image" />
      <div class="text">Music</div>
    </div>
  </header>
</template>

<script setup>
defineOptions({
  name: 'TopBar'
})
</script>

<style lang="less" scoped>
.top-bar {
  display: flex;
  place-items: center;
  place-content: center;
  height: 44px;
  &--content {
    display: flex;
    place-items: center;
    place-content: center;
    column-gap: 8px;
    .image {
      .square(30px);
      .adapt-image('@/assets/images/logo');
      background-size: 100% 100%;
    }
    .text {
      font-size: var(--font-size-large);
      color: var(--color-theme);
    }
  }
}
</style>
