<template>
  <nav class="nav-bar">
    <RouterLink class="nav-bar--link" to="/recommend">
      <span class="text">推荐</span>
    </RouterLink>
    <RouterLink class="nav-bar--link" to="/singer">
      <span class="text">歌手</span>
    </RouterLink>
    <RouterLink class="nav-bar--link" to="/rank">
      <span class="text">排行</span>
    </RouterLink>
    <RouterLink class="nav-bar--link" to="/search">
      <span class="text">搜索</span>
    </RouterLink>
  </nav>
</template>

<script></script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 44px;
  &--link {
    flex: 1;
    display: flex;
    place-items: center;
    place-content: center;
    color: var(--color-text);
    font-size: var(--font-size-medium);
    .text {
      padding: 6px 4px;
      border-bottom: 2px solid transparent;
    }
  }
  .router-link-active {
    .text {
      color: var(--color-theme);
      border-bottom-color: var(--color-theme);
    }
  }
}
</style>
