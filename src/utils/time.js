const M = 60

export function format(t) {
  t = t ?? 0
  t |= 0

  const m = Math.floor(t / M)
  const s = t - m * M

  return `${m}`.padStart(2, 0) + ':' + `${s}`.padStart(2, 0)
}
