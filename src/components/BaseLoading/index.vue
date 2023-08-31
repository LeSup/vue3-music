<template>
  <div class="loading">
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  height: 20px;
  transform: translate(-50%, -50%);
}
.loading-span {
  margin: 0 1px;
  height: 2px;
  border-left: 2px solid var(--color-theme);
  animation: dancing 0.9s linear alternate infinite;
  &:nth-child(1) {
    animation-delay: -0.3s;
    animation-direction: alternate-reverse;
  }
  &:nth-child(2) {
    animation-delay: -0.6s;
    animation-direction: alternate-reverse;
  }
  &:nth-child(4) {
    animation-delay: -0.3s;
  }
  &:nth-child(5) {
    animation-delay: -0.6s;
  }
}
@keyframes dancing {
  to {
    transform: scaleY(10);
  }
}
</style>
