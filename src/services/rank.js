import { get } from '@/utils/request'

export function getRank() {
  return get('/api/getTopList')
}

export function getRankDetail(top) {
  return get('/api/getTopDetail', {
    id: top.id,
    period: top.period
  })
}
