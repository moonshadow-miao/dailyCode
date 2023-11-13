function manacher (str: string): string {
    if (!str) return ''
    const strNew = str.split('').reduce((pre, cur) => pre.concat(['#', cur]), []).join('') + '#'
    let mostRight = -1
    let radiusPos = -1
    const palindromeList = []
    let index = 0
    let maxPalindrome = 0
    let maxRadiusIndex = -1
    while (index < strNew.length) {
        let radius = 1
        if (index < mostRight) {
            const symmetricPos = radiusPos * 2 - index
            radius = Math.min(palindromeList[symmetricPos], mostRight - index)
        }
        while (index + radius < strNew.length && index - radius >= 0 && strNew[index + radius] === strNew[index - radius]) {
            radius++
        }
        if (index + radius > mostRight) {
            mostRight = index + radius - 1
            radiusPos = index
        }
        if (maxPalindrome < radius) {
            maxPalindrome = radius
            maxRadiusIndex = index
        }
        palindromeList.push(radius)
        index++
    }
    return strNew.slice(maxRadiusIndex - maxPalindrome + 1, maxRadiusIndex + maxPalindrome).replace(/#/g, '')
}
