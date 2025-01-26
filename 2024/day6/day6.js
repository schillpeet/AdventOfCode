function wayToMove(direction, gp, lab) {
    switch(direction) {
        case '^':
            { const up = (gp) => !nextStepEndOfMapUp(gp) && !nextStepUpObstruction(gp) ? gp[0]-- : gp
            const nextStepEndOfMapUp = gp => gp[0] - 1 < 0
            const nextStepUpObstruction = gp => !nextStepEndOfMapUp(gp) && (lab[gp[0] - 1][gp[1]] === '#')
            return [0, gp[0] + 1, '>', up, nextStepEndOfMapUp, nextStepUpObstruction] }
        case '>':
            { const right = (gp) => !nextStepEndOfMapRight(gp) && !nextStepRightObstruction(gp) ? gp[1]++ : gp 
            const nextStepEndOfMapRight = gp => gp[1] + 1 > lab[gp[1]].length - 1
            const nextStepRightObstruction = gp => !nextStepEndOfMapRight(gp) && (lab[gp[0]][gp[1] + 1] === '#')
            return [gp[1], lab[gp[0]].length, 'v', right, nextStepEndOfMapRight, nextStepRightObstruction] }
        case 'v':
            { const down = (gp) => !nextStepEndOfMapDown(gp) && !nextStepDownObstruction(gp) ? gp[0]++ : gp
            const nextStepEndOfMapDown = (gp) => gp[0] + 1 > lab.length - 1
            const nextStepDownObstruction = gp => !nextStepEndOfMapDown(gp) && (lab[gp[0] + 1][gp[1]] === '#')
            return [gp[0], lab[gp[1]].length, '<', down, nextStepEndOfMapDown, nextStepDownObstruction] }
        case '<':
            { const left = (gp) => !nextStepEndOfMapLeft(gp) && !nextStepLeftObstruction(gp) ? gp[1]-- : gp
            const nextStepEndOfMapLeft = gp => gp[1] - 1 < 0
            const nextStepLeftObstruction = gp => !nextStepEndOfMapLeft(gp) && (lab[gp[0]][gp[1] - 1] === '#')
            return [0, gp[1] + 1, '^', left, nextStepEndOfMapLeft, nextStepLeftObstruction] }
    }
}

const markWithX = (lab, column, row) => lab[column][row] = 'X'
const isUpOrDown = sign => '^v'.includes(sign)
const isLeftOrRight = sign => '<>'.includes(sign)
const isPlus = sign => '+'.includes(sign)
const markWithPipeOrMinusOrPlus = (lab, column, row, currentMovement) => {
    switch(true) {
        case isUpOrDown(currentMovement):
            return lab[column][row] === '-' ? lab[column][row] = '+' : lab[column][row] = '|';
        case isLeftOrRight(currentMovement):
            return lab[column][row] === '|' ? lab[column][row] = '+' : lab[column][row] = '-';
        case isPlus(currentMovement):
            return lab[column][row] = '+';
    }
};

let numOfWays
function takenWay(lab, guardPosition, part) {
    let currentMovement = lab[guardPosition[0]][guardPosition[1]]
    let finished = false
    
    const markVisitedField = part === 1 ? markWithX : markWithPipeOrMinusOrPlus
    const searchSign = '.^-|'
    let endlessLoop = false
    let takenWays = 0
    
    while(!finished) {
        let [start, wtm, nextMove, move, nextStepEndOfMap, nextStepObstruction] = wayToMove(currentMovement, guardPosition, lab)
        const part2Sign = nextStepObstruction(guardPosition) ? '+' : currentMovement

        for (let i = start; i < wtm; i++) {
            if (takenWays > numOfWays) { endlessLoop = true; finished = true; break }
            
            const currentSign = lab[guardPosition[0]][guardPosition[1]]
            if (searchSign.includes(currentSign)) markVisitedField(lab, guardPosition[0], guardPosition[1], part2Sign)

            if (nextStepEndOfMap(guardPosition)) {finished = true; break}
            if (nextStepObstruction(guardPosition)) break
            move(guardPosition)
        }

        currentMovement = nextMove
        takenWays += 1
    }
    if (part === 2) return endlessLoop
    return lab
}

function part1(lab, guardPosition) { 
    const labWithAllXs = takenWay(lab, guardPosition, 1)
    return labWithAllXs.flat().filter(c => c === 'X').length
}


function part2(lab, guardPosition) {
    const labDeepCopy = lab.map(row => [...row])
    const labWithAllXs = takenWay(labDeepCopy, [...guardPosition], 1)
    
    // the start position of the guard is not allowed
    const takenWayOfGuard = labWithAllXs.flatMap((arr, idx1) => arr.map((sign, idx2) => sign === 'X' ? [idx1, idx2] : []).filter(e => e.length))
    const guardArrIdx = takenWayOfGuard.findIndex((entry) => entry[0] === guardPosition[0] && entry[1] === guardPosition[1])
    takenWayOfGuard.splice(guardArrIdx, 1)
    const numOfXsWithoutGuard = takenWayOfGuard.length

    // endless loop definition: the number of obstructions +2 
    //      +1 without obstructions there is always one way
    //      +1 we add also the second obstruction for part2
    //      +1 special case: if we you rotate and go back
    // this is the max of ways till the guard achieves the end of the map
    const numOfObstructions = lab.flatMap(c => c).filter(c => c === '#').length + 1
    numOfWays = numOfObstructions + 2

    let possilbeNumOfObstructions = 0
    for (let oIdx = 0; oIdx < numOfXsWithoutGuard; oIdx++) {
        // insert new obstruction, not 'O' like in the example but '#'
        const randomStep = takenWayOfGuard[oIdx] // because the array is sorted
        const labWithObstruction = lab.map(row => [...row])
        labWithObstruction[randomStep[0]][randomStep[1]] = '#'

        if (takenWay(labWithObstruction, [...guardPosition], 2)) possilbeNumOfObstructions++
    }

    return possilbeNumOfObstructions
}
    
/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    let guardPosition = input.split('\n').flatMap((str, idx) => str.includes('^') ? [idx, str.indexOf('^')] : []) // [col,row]
    let lab = input.split('\n').map(elem => elem.split(''))
    return !optF ? part1(lab, guardPosition) : part2(lab, guardPosition)
}

export { wayToMove, part1 }