function part1(input) {
    const labWestToEast = input.split('\n')
    const DIR = ['>','^','<','v']
    const startDirection = labWestToEast.flatMap(e => e.match(/[^.#]/g) || []).at(0)
    
    const startIdx = DIR.indexOf(startDirection) // = Character
    const nsDirection = startIdx === 3 ? DIR[0] : DIR[startIdx + 1]
    const labNorthToSouth = Array.from({ length: labWestToEast[0].length }, (_, idx) => labWestToEast.map(arr => arr.at(idx) === startDirection ? nsDirection : arr.at(idx)))

    const guardPosition = labWestToEast.flatMap((str, idx) => str.includes(startDirection) ? [idx, str.indexOf(startDirection)] : [])

    const nsIdx = DIR.indexOf(nsDirection)
    const ewDirection = nsIdx === 3 ? DIR[0] : DIR[nsIdx + 1]
    const labEastToWest = [...labWestToEast].reverse().map(arr => arr.split('').map(e => e === nsDirection ? ewDirection : e))

    const ewIdx = DIR.indexOf(ewDirection)
    const snDirection = ewIdx === 3 ? DIR[0] : DIR[ewIdx + 1]
    const labSouthToNorth = [...labWestToEast].reverse().map(arr => arr.split('').map(e => e === ewDirection ? snDirection : e))


    return -1
}

function part2(input) {
    console.error("Not implemented yet!")    
    return -1
}

/**
 * @param {String} input 
 * @param {Boolean} optF 
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}