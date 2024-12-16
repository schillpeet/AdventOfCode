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

// Very conventional solution: illustrates the good readability and is also programmed much faster
function part2(xmasInput) {
    const xmasArray = xmasInput.split('\n').map(line => [...line])
    let counter = 0
    for (let i = 1; i < xmasArray.length - 1; i++) {
        for (let j = 1; j < xmasArray[i].length - 1; j++) {
            if (xmasArray[i][j] === 'A') {
                let topLeft = xmasArray[i-1][j-1]
                let topRight = xmasArray[i-1][j+1]
                let bottomLeft = xmasArray[i+1][j-1]
                let bottomRight = xmasArray[i+1][j+1]
                let mainDiagonal = (topLeft === 'M' && bottomRight === 'S') || (topLeft === 'S' && bottomRight === 'M')
                let antiDiagonal = (topRight === 'M' && bottomLeft === 'S') || (topRight === 'S' && bottomLeft === 'M')
                if (mainDiagonal && antiDiagonal) counter += 1
            }
        }
    }
    return counter
}

export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}
