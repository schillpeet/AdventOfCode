const reg = /(?=(XMAS|SAMX))/g
const countOccurrencesOfXMasForwardsAndBackwards = (input) => [...input.matchAll(reg)].length
function transformsColumsToRaws(input) {
    let inputArr = input.split('\n')
    // not the most elegant solution, but it allows me to continue working with a square structure
    if (inputArr[0].length !== inputArr.length) {
        let diff = inputArr[0].length - inputArr.length
        input += '\n*'.repeat(diff)
    }
    return input.split('\n').map((_, idx, arr) => {
        return arr.map(elem => elem[idx]).join('')
    }).join('\n')
}
const handleDiagonal = (input, mainDiagonal) => input.split('\n').map((elem, idx, arr) => {
        const spacesEnd = '_'.repeat(arr.length * 2 - 1 - arr.length - idx)
        const spacesStart = '_'.repeat(idx)
        return mainDiagonal ? spacesStart + elem + spacesEnd : spacesEnd + elem + spacesStart
      }).join('\n')


function part1(xmasInput) {
    let rawsCount = countOccurrencesOfXMasForwardsAndBackwards(xmasInput)
    let columsCount = countOccurrencesOfXMasForwardsAndBackwards(transformsColumsToRaws(xmasInput))
    let mainDiagonal = countOccurrencesOfXMasForwardsAndBackwards(transformsColumsToRaws(handleDiagonal(xmasInput, true)))
    let antiDiagonal = countOccurrencesOfXMasForwardsAndBackwards(transformsColumsToRaws(handleDiagonal(xmasInput, false)))

    return rawsCount + columsCount + mainDiagonal + antiDiagonal
}
function part2() {}

export async function run(input, optF) {
    return !optF ? part1(input) : part2()
}
