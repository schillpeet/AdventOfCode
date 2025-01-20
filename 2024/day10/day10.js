/**
 * 
 * @param {number} curPosX 
 * @param {number} curPosY 
 * @returns {number}
 */
let nines = []
function trail(curPosX, curPosY) {
    if (topographicMap[curPosX][curPosY] === 9) {
        if (!nines.some(e => e[0] === curPosX && e[1] === curPosY)) nines.push([curPosX, curPosY]) 
        return 1
    }
    // first we check, that we don't cross the border of the map
    // second we check, that the next value is exactly one value higher at the current value: so these is the condition of moving
    // up
    let ways = 0
    if (curPosX !== 0 && topographicMap[curPosX][curPosY] + 1 === topographicMap[curPosX - 1][curPosY]) {
        ways += trail(curPosX-1, curPosY)
    }
    // down
    if (curPosX !== topographicMap.length-1 && topographicMap[curPosX][curPosY] + 1 === topographicMap[curPosX + 1][curPosY]) {
        ways += trail(curPosX+1, curPosY)
    }
    // left
    if (curPosY !== 0 && topographicMap[curPosX][curPosY] + 1 === topographicMap[curPosX][curPosY - 1]) {
        ways += trail(curPosX, curPosY - 1)
    }
    // right
    if (curPosY !== topographicMap[curPosX].length-1 && topographicMap[curPosX][curPosY] + 1 === topographicMap[curPosX][curPosY + 1]) {
        ways += trail(curPosX, curPosY + 1)
    }
    return ways
}

let topographicMap
/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {String} input 
 * @returns 
 */
function part1(input) { 
    // 1. create CO-system
    topographicMap = input.split('\n').map(row => row.split('').map(char => Number(char)))

    // 2. creates coordinates of trailheads (0 = start postion)
    const trailheads = topographicMap.flatMap((row, rIdx) => 
        row.map((num, nIdx) => num === 0 ? [rIdx, nIdx] : null)
    ).filter(arr => arr)
    
    // 3. a path is found if the starting point is 0 and 9 has never been reached before
    const sumOfScores = trailheads.reduce((acc, [x,y]) => {
        trail(x, y)
        acc += nines.length
        nines = []
        return acc
    }, 0)
    return sumOfScores


    
    // 3. counts all possible trails
/*     const sumOfScores = trailheads.reduce((acc, [x,y]) => acc += trail(x,y,0), 0)

    return sumOfScores */
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