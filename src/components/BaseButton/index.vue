<template>
  <div class="button" @click.stop="handleClick">
    <slot></slot>
    <div class="text">{{ props.text }}</div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BaseButton'
})

const emit = defineEmits(['click'])

const props = defineProps({
  text: String
})

function handleClick() {
  emit('click')
}
</script>

<style lang="less" scoped>
.button {
  display: flex;
  place-items: center;
  place-content: center;
  column-gap: 8px;
  width: 136px;
  height: 32px;
  color: var(--color-theme);
  border: 1px solid;
  border-radius: 16px;
  box-sizing: border-box;
  .text {
    font-size: var(--font-size-medium);
  }
}
</style>
