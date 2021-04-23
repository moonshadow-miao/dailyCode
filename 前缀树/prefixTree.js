class Trie {
  constructor() {
    this.root = new TrieNode() // 前缀树的根结点
  }

  insert(str) {
    if (!str.length) {
      return
    }
    const minUnicode = 97
    let root = this.root
    let index = 0
    root.path++
    while (index < str.length) {
      if (!root.nexts[str.charCodeAt(index) - minUnicode]) {
        root.nexts[str.charCodeAt(index) - minUnicode] = new TrieNode()
      }
      root = root.nexts[str.charCodeAt(index) - minUnicode]
      root.path++
      index++
    }
    root.end++
  }

  search(str) {
    if (!str.length) {
      return false
    }
    const minUnicode = 97
    let root = this.root
    let index = 0
    while (index < str.length) {
      if (!root.nexts[str.charCodeAt(index) - minUnicode]) {
        return false
      }
      root = root.nexts[str.charCodeAt(index) - minUnicode]
      index++
    }
    return root.end > 0
  }

  prefixNumber(str) {
    if (!str.length) {
      return 0
    }
    const minUnicode = 97
    let root = this.root
    let index = 0
    while (index < str.length) {
      if (!root.nexts[str.charCodeAt(index) - minUnicode]) {
        return 0
      }
      root = root.nexts[str.charCodeAt(index) - minUnicode]
      index++
    }
    return root.path
  }

  delete(str) {
    if (!str.length) {
      return false
    }
    if (!this.search(str)) {
      return false
    }
    const minUnicode = 97
    let root = this.root
    let index = 0
    let parent = null
    while (index < str.length) {
      root.path--
      if (root.path === 0) {
        parent.nexts[str.charCodeAt(index -1) - minUnicode] = null
        return true
      }
      parent = root
      root = root.nexts[str.charCodeAt(index) - minUnicode]
      index++
    }
    root.end--
    return true
  }
}

class TrieNode {
  constructor() {
    this.path = 0
    this.end = 0
    this.nexts = []
  }
}

let strList = ['abc', 'abcd', 'ab', 'acd', 'bda', 'acd', 'abcf', 'cf']

function generatorTree(strList) {
  const tree = new Trie()
  strList.forEach(str => {
    tree.insert(str)
  })
  return tree
}

console.log(generatorTree(strList))
