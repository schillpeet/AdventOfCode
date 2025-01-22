/**
 * @param {number[]} arr - input value
 * @param {Number} numOfBlinks - number of blinks
 * @returns {number[]} - list of all values that are calculated
 */
function blink(arr, numOfBlinks) {
    for (let index = 0; index < numOfBlinks; index++) {
        arr = arr.flatMap(stone => {
            // rule 1: replaces the 0 with a 1
            if (stone === 0) return 1
            // rule 2: replaced by two stones
            const stoneLength = stone.toString().length
            if (stoneLength % 2 === 0) {
                const leftStone = stone.toString().slice(0, stoneLength/2)
                const rightStone = stone.toString().slice(stoneLength/2)
                return [Number(leftStone), Number(rightStone)]
            }
            // rule 3: multiplies stone with 2024
            return stone * 2024
        })
    }
    return arr
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {String} input 
 * @returns 
 */
function part1(input) { 
    let arr = input.split(' ').map(e => Number(e))
    const twentyFiveBlinks = blink(arr, 25)
    return twentyFiveBlinks.length
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {String} input 
 * @returns 
 */
function part2(input) {
    console.error("Not implemented yet!", input)    
    return -1
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}

export { part1, blink }