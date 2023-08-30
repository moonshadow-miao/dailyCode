class PriorityQueue<T extends object> {
    private heap: T[] = []
    private itemMap = new Map<T, number>()

    constructor(private compare: (a: T, b: T) => number) {
        if (typeof compare !== 'function') {
            throw Error('compare must be a function')
        }
    }

    // 弹出堆顶项
    offer() {
        const removeItem = this.heap[0]
        this.swap(0, this.heap.length - 1)
        this.heap.pop()
        this.itemMap.delete(removeItem)
        this.heapFy()
        return removeItem
    }

    init(arr: T[]) {
        if (this.heap.length) {
            throw Error('heap has init')
        }
        arr.forEach((item, index) => {
            this.itemMap.set(item, index)
            this.heap.push(item)
        })
        for (let i = this.heap.length - 1; i >= 0; i--) {
            this.heapFy(i)
        }
    }

    add(item: T) {
        this.heap.push(item)
        this.itemMap.set(item, this.heap.length - 1)
        this.heapInsert(this.heap.length - 1)
    }

    // 删除某一项
    remove(item: T) {
        const removeIndex = this.itemMap.get(item)
        if (removeIndex === undefined) throw Error(`heap don't contain this item`)
        const removeItem = this.heap[removeIndex]
        this.swap(removeIndex, this.heap.length - 1)
        this.heap.pop()
        this.itemMap.delete(removeItem)
        this.heapFy(removeIndex)
        this.heapInsert(removeIndex)
        return removeItem
    }

    // 查看堆顶项
    peek(): T {
        if (!this.heap.length) return null
        return this.heap[this.heap.length - 1]
    }

    update(item: T) {
        const updateIndex = this.itemMap.get(item)
        if (updateIndex === undefined) throw Error(`heap don't contain this item`)
        this.heapFy(updateIndex)
        this.heapInsert(updateIndex)
    }

    clear() {
        this.heap = []
        this.itemMap.clear()
    }

    private swap(index1, index2) {
        if (index1 === index2) return
        let temp = this.heap[index1]
        this.heap[index1] = this.heap[index2]
        this.heap[index2] = temp
        this.itemMap.set(this.heap[index1], index1)
        this.itemMap.set(this.heap[index2], index2)
    }

    // 从某个位置向下调整堆
    private heapFy(index: number = 0) {
        let leftChild = (index << 1) + 1
        while (leftChild < this.heap.length) {
            let rightChild = leftChild + 1 < this.heap.length ? leftChild + 1 : this.heap.length - 1
            let compareChild = this.compare(this.heap[leftChild], this.heap[rightChild]) < 0 ? leftChild : rightChild
            let compareRes = this.compare(this.heap[index], this.heap[compareChild])
            if (compareRes > 0) {
                this.swap(index, compareChild)
                index = compareChild
                leftChild = (index << 1) + 1
            } else {
                break
            }
        }
    }

    // 从某个位置向上调整堆
    private heapInsert(index: number) {
        while (index) {
            let parent = (index - 1) >> 1
            let compareRes = this.compare(this.heap[parent], this.heap[index])
            if (compareRes > 0) {
                this.swap(index, parent)
                index = parent
            } else {
                break
            }
        }
    }
}

function priorityQueue<T extends object>(compare: (a: T, b: T) => number) {
    if (typeof compare !== 'function') {
        throw Error('compare must be a function')
    }
    let heap: T[] = []
    const itemMap = new Map<T, number>()

    // 弹出堆顶项
    function offer() {
        const removeItem = heap[0]
        swap(0, heap.length - 1)
        heap.pop()
        itemMap.delete(removeItem)
        heapFy()
        return removeItem
    }

    function init(arr: T[]) {
        if (heap.length) {
            throw Error('heap has init')
        }
        arr.forEach((item, index) => {
            itemMap.set(item, index)
            heap.push(item)
        })
        for (let i = heap.length - 1; i >= 0; i--) {
            heapFy(i)
        }
    }

    function add(item: T) {
        heap.push(item)
        itemMap.set(item, heap.length - 1)
        heapInsert(heap.length - 1)
    }

    // 删除某一项
    function remove(item: T) {
        const removeIndex = itemMap.get(item)
        if (removeIndex === undefined) throw Error(`heap don't contain this item`)
        const removeItem = heap[removeIndex]
        swap(removeIndex, heap.length - 1)
        heap.pop()
        itemMap.delete(removeItem)
        heapFy(removeIndex)
        heapInsert(removeIndex)
        return removeItem
    }

    // 查看堆顶项
    function peek(): T {
        if (!heap.length) return null
        return heap[heap.length - 1]
    }

    function update(item: T) {
        const updateIndex = itemMap.get(item)
        if (updateIndex === undefined) throw Error(`heap don't contain this item`)
        heapFy(updateIndex)
        heapInsert(updateIndex)
    }

    function clear() {
        heap = []
        itemMap.clear()
    }

    function swap(index1, index2) {
        if (index1 === index2) return
        let temp = heap[index1]
        heap[index1] = heap[index2]
        heap[index2] = temp
        itemMap.set(heap[index1], index1)
        itemMap.set(heap[index2], index2)
    }

    // 从某个位置向下调整堆
    function heapFy(index: number = 0) {
        let leftChild = (index << 1) + 1
        while (leftChild < heap.length) {
            let rightChild = leftChild + 1 < heap.length ? leftChild + 1 : heap.length - 1
            let compareChild = compare(heap[leftChild], heap[rightChild]) < 0 ? leftChild : rightChild
            let compareRes = compare(heap[index], heap[compareChild])
            if (compareRes > 0) {
                swap(index, compareChild)
                index = compareChild
                leftChild = (index << 1) + 1
            } else {
                break
            }
        }
    }

    // 从某个位置向上调整堆
    function heapInsert(index: number) {
        while (index) {
            let parent = (index - 1) >> 1
            let compareRes = compare(heap[parent], heap[index])
            if (compareRes > 0) {
                swap(index, parent)
                index = parent
            } else {
                break
            }
        }
    }

    return {init, offer, add, update, remove, peek, clear, viewQueue: () => heap}
}

export default PriorityQueue



