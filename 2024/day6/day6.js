function wayToMove(direction, gp, lab) {
    switch(direction) {
        case '^':
            const up = (gp) => gp[0] === 0 ? gp : gp[0]--
            const backUp = (gp) => gp[0]++
            return [0, gp[0] + 1, '>', up, backUp]
        case '>':
            const right = (gp) => gp[1] === gp[1].length - 1 ? gp : gp[1]++
            const backRight = (gp) => gp[1]--
            return [gp[1], lab[gp[0]].length, 'v', right, backRight]
        case 'v':
            const down = (gp) => gp[0] === lab[gp[1]].length - 1 ? gp : gp[0]++
            const backDown = (gp) => gp[0]--
            return [gp[0], lab[gp[1]].length, '<', down, backDown]
        case '<':
            const left = (gp) => gp[1] === 0 ? gp : gp[1]--
            const backLeft = (gp) => gp[1]++
            return [0, gp[1] + 1, '^', left, backLeft]
    }
}

function part1(input) { 
    let guardPosition = input.flatMap((str, idx) => str.includes('^') ? [idx, str.indexOf('^')] : []) // [col,row]
    let lab = input.map(elem => elem.split(''))
    let stepsOfGuard = 0

    let currentMovement = lab[guardPosition[0]][guardPosition[1]]
    let finished = false
    
    while(!finished) {
        let [start, wtm, nextMove, move, unmove] = wayToMove(currentMovement, guardPosition, lab)

        for (let i = start; i < wtm; i++) {
            if (lab[guardPosition[0]][guardPosition[1]] !== 'X') {
                lab[guardPosition[0]][guardPosition[1]] = 'X'
                stepsOfGuard++
            }
            let guardPositionBefore = [...guardPosition]
            move(guardPosition)

            if (guardPositionBefore[0] === guardPosition[0] && guardPositionBefore[1] === guardPosition[1] ) {
                unmove(guardPosition)
                finished = true
                break
            }
            
            if (lab[guardPosition[0]][guardPosition[1]] === '#') {
                unmove(guardPosition)
                break
            }
        }
        currentMovement = nextMove
    }

    return stepsOfGuard
}

function part2(input) {
    console.error("Not implemented yet!")    
    return -1
}

/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    let partOneInput = input.split('\n')
    return !optF ? part1(partOneInput) : part2(input)
}