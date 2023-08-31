import { createApp } from 'vue'
import BaseLoading from './index.vue'
import { addCls } from '@/utils/dom'

const Positions = ['relative', 'fixed', 'absolute']
const PositionCls = 'relative'

function append(el) {
  const style = getComputedStyle(el)
  if (!Positions.includes(style.position)) {
    addCls(el, PositionCls)
  }
  el.appendChild(el.instance)
}

function remove(el) {
  if (el.contains(el.instance)) {
    el.removeChild(el.instance)
  }
}

export default {
  mounted(el, binding) {
    const loading = createApp(BaseLoading)
    const instance = loading.mount(document.createElement('div'))
    el.instance = instance.$el
    if (binding.value) {
      append(el)
    }
  },
  updated(el, { value, oldValue }) {
    if (value !== oldValue) {
      value ? append(el) : remove(el)
    }
  },
  beforeUnmount(el) {
    remove(el)
    delete el.instance
  }
}
