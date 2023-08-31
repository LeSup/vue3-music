export function hasCls(el, cls) {
  if (!el) {
    return false
  }
  return el.classList.contains(cls)
}

export function addCls(el, cls) {
  if (hasCls(el, cls)) {
    return
  }

  el.classList.add(cls)
}

export function removeCls(el, cls) {
  if (!hasCls(el, cls)) {
    return
  }

  el.classList.remove(cls)
}
