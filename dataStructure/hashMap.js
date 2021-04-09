class HashMap {
  put(key, value) {
   this[key] = value
  }

  remove(key) {
    delete this[key]
  }

  get(key) {
    return this[key]
  }
}
