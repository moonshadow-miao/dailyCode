function deepClone(origin, weakMap = new WeakMap()) {
  if (origin === null) {
    return null
  }
  if (typeof origin === 'function') {
    return new Function(`{return ${origin}}`)()
  }
  if(typeof origin !== 'object') {
    return origin
  }
  if (weakMap.has(origin)) {
    return weakMap.get(origin)
  }
  const newObj = Object.create(origin)
  weakMap.set(origin, newObj)
  Object.keys(origin).forEach(key => {
    newObj[key] = deepClone(origin[key], weakMap)
  })
  return newObj
}
