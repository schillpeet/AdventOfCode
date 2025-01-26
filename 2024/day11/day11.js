//const MAP_OF_STONES = new Map()

// result of calculateMapOfStones(), because it's faster
const MAP_OF_STONES = new Map([
    [1, [
            1,       2,        4,       4,
            7,      14,       16,      20,
           39,      62,       81,     110,
          200,     328,      418,     667,
         1059,    1546,     2377,    3572,
         5602,    8268,    12343,   19778,
        29165,   43726,    67724,  102131,
       156451,  234511,   357632,  549949,
       819967, 1258125,  1916299, 2886408,
      4414216, 6669768, 10174278
    ]],
    [2, [
            1,       2,       4,       4,       6,
           12,      16,      19,      30,      57,
           92,     111,     181,     295,     414,
          661,     977,    1501,    2270,    3381,
         5463,    7921,   11819,   18712,   27842,
        42646,   64275,   97328,  150678,  223730,
       343711,  525238,  784952, 1208065, 1824910,
      2774273, 4230422, 6365293, 9763578
    ]],
    [3, [
            1,       2,       4,       4,       5,
           10,      16,      26,      35,      52,
           79,     114,     202,     294,     401,
          642,     987,    1556,    2281,    3347,
         5360,    7914,   12116,   18714,   27569,
        42628,   64379,   98160,  150493,  223231,
       344595,  524150,  788590, 1210782, 1821382,
      2779243, 4230598, 6382031, 9778305
    ]],
    [4, [
            1,       2,       4,       4,       4,
            8,      16,      27,      30,      47,
           82,     115,     195,     269,     390,
          637,     951,    1541,    2182,    3204,
         5280,    7721,   11820,   17957,   26669,
        41994,   62235,   95252,  146462,  216056,
       336192,  508191,  766555, 1178119, 1761823,
      2709433, 4110895, 6188994, 9515384
    ]],
    [5, [
            1,       1,       2,       4,       8,
            8,      11,      22,      32,      45,
           67,     109,     163,     223,     383,
          597,     808,    1260,    1976,    3053,
         4529,    6675,   10627,   15847,   23822,
        37090,   55161,   84208,  128121,  194545,
       298191,  444839,  681805, 1042629, 1565585,
      2396146, 3626619, 5509999, 8396834
    ]],
    [6, [
            1,       1,       2,       4,       8,
            8,      11,      22,      32,      54,
           68,     103,     183,     250,     401,
          600,     871,    1431,    2033,    3193,
         4917,    7052,   11371,   16815,   25469,
        39648,   57976,   90871,  136703,  205157,
       319620,  473117,  727905, 1110359, 1661899,
      2567855, 3849988, 5866379, 8978479
    ]],
    [7, [
            1,       1,       2,       4,       8,
            8,      11,      22,      32,      52,
           72,     106,     168,     242,     413,
          602,     832,    1369,    2065,    3165,
         4762,    6994,   11170,   16509,   25071,
        39034,   57254,   88672,  134638,  203252,
       312940,  465395,  716437, 1092207, 1637097,
      2519878, 3794783, 5771904, 8814021
    ]],
    [8, [
            1,       1,       2,       4,       7,
            7,      11,      22,      31,      48,
           69,     103,     161,     239,     393,
          578,     812,    1322,    2011,    3034,
         4580,    6798,   10738,   16018,   24212,
        37525,   55534,   85483,  130183,  196389,
       301170,  450896,  691214, 1054217, 1583522,
      2428413, 3669747, 5573490, 8505207
    ]],
    [9, [
            1,       1,       2,       4,       8,
            8,      11,      22,      32,      54,
           70,     103,     183,     262,     419,
          586,     854,    1468,    2131,    3216,
         4888,    7217,   11617,   17059,   25793,
        40124,   58820,   92114,  139174,  208558,
       322818,  480178,  740365, 1126352, 1685448,
      2602817, 3910494, 5953715, 9102530
    ]]
])

const NUM_OF_BLINKS_P1 = 25
const NUM_OF_BLINKS_P2 = 75


/**
 * @param {Array<number>} arr - input value
 * @param {number} numOfBlinks - number of blinks
 * @returns {Array<number>} - list of all values that are calculated
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
 * max blinks = 39 with example as input (it takes ~10sec.)
 * max blinks = 45 with just one value (it takes ~10sec.)
 * with part2 and puzzle input => 9 days :-D
 * @param {string} input 
 * @returns 
 */
function part1(input) { 
    let arr = input.split(' ').map(e => Number(e))
    const twentyFiveBlinks = blink(arr, NUM_OF_BLINKS_P1)
    return twentyFiveBlinks.length
}

/**
 * @param {number} stone - input value
 * @param {number} startIndex - start index
 * @param {number} numOfBlinks - number of blinks with Dependency Injection allows better testing
 * @param {boolean} useMemory - uses the memory
 * @param {number} threshold - the memory should only be used once a certain index threshold has been reached
 * @returns {number} - list of all values that are calculated
 */
function blinkFaster(stone, startIndex, numOfBlinks, useMemory, threshold) {
    let counter = 1
    
    for (let index = startIndex; index < numOfBlinks; index++) {
        // only important once memory initialization is complete
        if (useMemory && stone < 10 && stone > 0 && index >= threshold) {
            // 1. get the correct entry from the array
            let diff = numOfBlinks - index
            let memValue = MAP_OF_STONES.get(stone).at(diff-1) 

            // 2. add the current counter to the stored value from memory and subtract one stone 
            // (this stone is the initial stone)
            counter += memValue - 1
            break
        }

        // rule 1: replaces the 0 with a 1 (occurs on average less frequently than rule2)
        if (stone === 0) { stone = 1; continue }

        const stoneToString = stone.toString()
        const stoneLength = stoneToString.length
        
        // rule 2: replaced by two stones
        if (stoneLength % 2 === 0 && stone !== 0) {
            const halfStoneLen = stoneLength / 2
            const leftStone = stoneToString.slice(0, halfStoneLen)
            const rightStone = Number(stoneToString.slice(halfStoneLen))
            stone = Number(leftStone)

            counter += blinkFaster(rightStone, index+1, numOfBlinks, useMemory, threshold)
        }

        // rule 3: multiplies stone with 2024
        else { stone *= 2024 }

    }
    return counter
}

/**
 * 
 * @param {Array<number>} arr - puzzle input as array
 * @param {number} numOfBlinks [numOfBlinks=NUM_OF_BLINKS_P2] - optional: number of blinks
 * @param {number} threshold [threshold=35] - optional: number of threshold
 * @returns {number} - returns number of stones
 */
function numberOfStones(arr, numOfBlinks = NUM_OF_BLINKS_P2, threshold = 36) {
    let result = 0
    for (let startStone = 0; startStone < arr.length; startStone++) {
        result += blinkFaster(arr[startStone], 0, numOfBlinks, true, threshold)
    }
    return result
}


/* function calculateMapOfStones() {
    // save all results of digits between 1 and 9 in a map with the times of blinks
    for (let stone = 1; stone < 10; stone++) {
        MAP_OF_STONES.set(stone, [])
        for (let blink = 1; blink < 40; blink++) {
            MAP_OF_STONES.get(stone).push(blinkFaster(stone, 0, blink, false, NaN))
        }
    }
    console.log(`Saved ${NUM_OF_BLINKS_P2} blinks of all stones between 1 and 9...` + '\n')
} */

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input 
 * @returns 
 */
function part2(input) {
    let arr = input.split(' ').map(e => Number(e))
    //calculateMapOfStones()
    return numberOfStones(arr)
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input - including line breaks
 * @param {boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}

export { part1, blink, numberOfStones }
