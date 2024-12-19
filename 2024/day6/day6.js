/**
 * The cardinal points refer to the laboratory with a fixed point of view. This means that 
 * if the guard walks from left to right, it means from east to west. 
 */
function allDirectionsAndGuardPosition(input) {
    const DIR = ['>','^','<','v']
    const allDir = [null, null, null, null]

    const inputArr = input.split('\n')
    const labWestToEast = inputArr.map(arr => arr.split(''))
    const weDirection = inputArr.flatMap(e => e.match(/[^.#]/g) || []).at(0) // character, e.g. '^'
    const weIdx = DIR.indexOf(weDirection) // position of character (e.g. ^) in DIR
    // CHECK
    //if (weDirection === 'v') labWestToEast.map(arr => arr.reverse())
    allDir[weIdx] = labWestToEast
    
    const nsDirection = weIdx === 3 ? DIR[0] : DIR[weIdx + 1]
    const nsIdx = DIR.indexOf(nsDirection)
    const labNorthToSouth = Array.from({ length: labWestToEast[0].length }, (_, idx) => labWestToEast.map(arr => arr.at(idx) === weDirection ? nsDirection : arr.at(idx)))
    // CHECK
    //if (nsDirection === 'v') labNorthToSouth.map(arr => arr.reverse())
    allDir[nsIdx] = labNorthToSouth
    
    const ewDirection = nsIdx === 3 ? DIR[0] : DIR[nsIdx + 1]
    const ewIdx = DIR.indexOf(ewDirection)
    const labEastToWest = [...labWestToEast].map(arr => arr.map(char => char === weDirection ? ewDirection : char).reverse())
    // CHECK
    //if (ewDirection === 'v') {labEastToWest.map(arr => arr.reverse()); console.log("ew is v")}
    allDir[ewIdx] = labEastToWest
    
    const snDirection = ewIdx === 3 ? DIR[0] : DIR[ewIdx + 1]
    const snIdx = DIR.indexOf(snDirection)
    const labSouthToNorth = [...labNorthToSouth].map(arr => arr.map(char => char === nsDirection ? snDirection : char).reverse())
    // CHECK
    //if (snDirection === 'v') labSouthToNorth.map(arr => arr.reverse())
    allDir[snIdx] = labSouthToNorth

    // e.g., [ 0, 9 ] means array: 0, index: 9
    const guardPosition = allDir[0].flatMap((arr, idx) => arr.indexOf('>') !== -1 ? [idx, arr.indexOf('>')] : [])
    
    return [allDir, guardPosition]
}

function part1(input) {
    const [allDir, guardPos] = allDirectionsAndGuardPosition(input)
    allDir.forEach(arr => {
        arr.forEach(arr2 => console.log(arr2))
        console.log()
    });
    /* let countFields = 0
    const currentDirection = 0
    while(1) {
        const theWayToGo = allDir[currentDirection][guardPos[0]].slice(guardPos[1] + 1)

        const theWayTaken = theWayToGo.indexOf('#') !== -1 
            ? [countFields += theWayToGo.indexOf('#') - 1, false] 
            : [countFields += theWayToGo.length, true]
        if (theWayTaken[1]) return countFields
        currentDirection === 3 ? currentDirection = 0 : currentDirection += 1
        guardPos[0] = ???
        guardPos[1] = ???
    } */
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