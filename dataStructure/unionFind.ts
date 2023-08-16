// 并查集
class UnionFind {
  constructor(list) {
    this.elementMap = new Map() // <value, element>
    this.fatherMap = new Map() // <element, element> 子 => 父
    this.sizeMap = new Map() // 每个集合的长度，<element, int>
    list.forEach(value => {
      let element =  new Element(value)
      this.elementMap.set(value, element)
      this.fatherMap.set(element, element)
      this.sizeMap.set(element, 1)
    })
  }

  findHead(element) {
    const childElements = []
    while (this.fatherMap.get(element) !== element) {
      childElements.push(element)
      element = this.fatherMap.get(element)
    }
    childElements.forEach(child => {
      this.fatherMap.set(child, element)
    })
    return element
  }

  isSameSet(value1, value2) {
    let element1 = this.elementMap.get(value1)
    let element2 = this.elementMap.get(value2)
    return this.findHead(element1) === this.findHead(element2)
  }

  union(value1, value2) {
    let element1 = this.elementMap.get(value1)
    let element2 = this.elementMap.get(value2)
    if (!element1 || !element2) {
      return false
    }
    let head1 = this.findHead(element1)
    let head2 = this.findHead(element2)
    if (head1 === head2) {
      return
    }
    let father = this.sizeMap.get(head1) > this.sizeMap.get(head2) ? head1 : head2
    let child = father === head1 ? head2 : head1
    this.fatherMap.set(child, father)
    this.sizeMap.set(father, this.sizeMap.get(head1) + this.sizeMap.get(head2))
    this.sizeMap.delete(child)
  }
}

class Element {
  constructor(value) {
    this.value = value
  }
}

const unionFind = new UnionFind([1, 2, 3, 4, 5, 7, 8])
// console.log(unionFind)
unionFind.union(1, 2)

unionFind.union(3, 4)

unionFind.union(1, 3)

console.log(unionFind.isSameSet(2, 4))
console.log(unionFind)

