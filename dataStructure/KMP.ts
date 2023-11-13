// KMP
function KMP(str1: string, str2: string): number {
    function getNext(str: string): number[] {
        if (!str) return []
        if (str.length === 1) return [-1]
        if (str.length === 2) return [-1, 0]
        let next = [-1, 0]
        let index = 2
        let preIndex = 0
        while (index < str.length) {
            if (str[index - 1] === str[preIndex]) {
                next[index++] = ++preIndex
            } else if (next[preIndex] === -1) {
                next[index++] = 0
            } else {
                preIndex = next[preIndex]
            }
        }
        return next
    }

    const next = getNext(str2)

    let index1 = 0
    let index2 = 0
    while (index1 < str1.length && index2 < str2.length) {
        if (str1[index1] === str2[index2]) {
            index1++
            index2++
        } else if (next[index2] !== -1){
            index2 = next[index2]
        } else {
            index1++
        }
    }

    return index1 < str1.length ? (index1 - str2.length) : -1
}
