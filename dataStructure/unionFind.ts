// 并查集
export {}
// @ts-ignore
class UFElement {
    private value: any;

    constructor(value: any) {
        this.value = value
    }
}

class UnionFindMap {
    private elementMap: Map<any, any>;
    private fatherMap: Map<any, any>;
    private sizeMap: Map<any, any>;

    constructor(list) {
        this.elementMap = new Map() // <value, element>
        this.fatherMap = new Map() // <element, element> 子 => 父
        this.sizeMap = new Map() // 每个集合的长度，<element, int>
        list.forEach(value => {
            // @ts-ignore
            let element = new UFElement(value)
            this.elementMap.set(value, element)
            this.fatherMap.set(element, element)
            this.sizeMap.set(element, 1)
        })
    }

    findHead(element: any) {
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

    isSameSet(value1: any, value2: any) {
        let element1 = this.elementMap.get(value1)
        let element2 = this.elementMap.get(value2)
        return this.findHead(element1) === this.findHead(element2)
    }

    union(value1: any, value2: any) {
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

class UnionFind<T = any> {
    private readonly size: number[] = []
    private readonly parent: number[] = []
    private elements: Map<T, number>
    private readonly data: T[]
    public setsNum = 0

    constructor(data: T[]) {
        this.size = Array(data.length).fill(1)
        this.parent = data.map((_, index) => index)
        this.elements = new Map()
        data.forEach((item, index) => this.elements.set(item, index))
        this.data = data
        this.setsNum = data.length
    }

    private findHead(index: number) {
        const list = []
        while (index !== this.parent[index]) {
            list.push(index)
            index = this.parent[index]
        }
        while (list.length) {
            this.parent[list.pop()] = index
        }
        return index
    }

    isSameSet(item1: T, item2: T) {
        const index1 = this.elements.get(item1)
        const index2 = this.elements.get(item2)
        return this.findHead(index1) === this.findHead(index2)
    }

    union(item1: T, item2: T) {
        const index1 = this.elements.get(item1)
        const index2 = this.elements.get(item2)
        if (index1 === undefined || index2 === undefined) {
            return;
        }
        const head1 = this.findHead(index1)
        const head2 = this.findHead(index2)
        if (head1 === head2) {
            return
        }
        const bigger = this.size[head1] > this.size[head2] ? head1 : head2
        const smaller = this.size[head1] > this.size[head2] ? head2 : head1
        this.parent[smaller] = bigger
        this.size[bigger] = this.size[head1] + this.size[head2]
        this.size[smaller] = 0
        this.setsNum--
    }

    // 查找所在集合的代表元素
    find(item: T) {
        return this.data[this.findHead(this.elements.get(item))]
    }

    add(item: T) {
        if (!this.elements.get(item)) {
            this.data.push(item)
            this.parent.push(this.data.length - 1)
            this.size.push(1)
            this.elements.set(item, this.data.length - 1)
            this.setsNum++
        }
    }
}
