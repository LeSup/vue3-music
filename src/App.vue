<script setup>
import TopBar from '@/components/TopBar/index.vue'
import NavBar from '@/components/NavBar/index.vue'
</script>

<template>
  <div id="app">
    <TopBar />
    <NavBar />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </div>
</template>

<style lang="less" scoped></style>
