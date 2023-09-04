function getRandomIndex(len) {
  return Math.floor(Math.random() * len)
}

export default function shuffle(list) {
  list = list.slice()

  let r,
    i = list.length
  while (i--) {
    r = getRandomIndex(i)
    ;[list[i], list[r]] = [list[r], list[i]]
  }

  return list
}
