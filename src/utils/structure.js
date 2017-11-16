export function objectListToArrayList(list) {
  return Object.keys(list).map(item => list[item])
}

export function arrayListToObjectArray(list) {
  const newList = {}
  list.forEach(item => { newList[item.id] = item })
  return newList
}
