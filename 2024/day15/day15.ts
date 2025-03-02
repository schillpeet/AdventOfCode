type Position = { x: number, y: number }
type Field = { pos: Position, ttype: TileType }

enum TileType { Robot, Box, Free, Wall, LBracket, RBracket }
enum Move { Up, Left, Down, Right }

function createWarehouse(input: string): Field[] {
    return input.split('\n').map(l => l.split(''))
        .map((line, lIdx) => line.map((elem, eIdx) => ({
            pos: { x: eIdx, y: lIdx },
            ttype: elem === '.' ? TileType.Free : elem === 'O' ? TileType.Box : elem === '#' ? TileType.Wall : TileType.Robot
        }))).flat()
}

function wayRight(warehouse:Field[], robot:Field) {
    const potWay = warehouse.filter(elem => elem.pos.y === robot.pos.y && elem.pos.x > robot.pos.x)
    const walls = potWay.filter(tile => tile.ttype === TileType.Wall)
    const firstWall = walls.length === 1 ? walls[0] : walls.reduce((acc,value) => acc.pos.x < value.pos.x ? acc : value, walls[0])
    return potWay.filter(elem => elem.pos.x < firstWall.pos.x)
}
function wayLeft(warehouse:Field[], robot:Field){ 
    const potWay = warehouse.filter(elem => elem.pos.y === robot.pos.y && elem.pos.x < robot.pos.x)
    const walls = potWay.filter(tile => tile.ttype === TileType.Wall)
    const firstWall = walls.length === 1 ? walls[0] : walls.reduce((acc,value) => acc.pos.x > value.pos.x ? acc : value, walls[0])
    return potWay.filter(elem => elem.pos.x > firstWall.pos.x)
}
function wayUp(warehouse:Field[], robot:Field) {
    const potWay = warehouse.filter(elem => elem.pos.y < robot.pos.y && elem.pos.x === robot.pos.x)
    const walls = potWay.filter(tile => tile.ttype === TileType.Wall)
    const firstWall = walls.length === 1 ? walls[0] : walls.reduce((acc,value) => acc.pos.y > value.pos.y ? acc : value, walls[0])
    const result = potWay.filter(elem => elem.pos.y > firstWall.pos.y)
    return result
}
function wayDown(warehouse:Field[], robot:Field) {
    const potWay = warehouse.filter(elem => elem.pos.y > robot.pos.y && elem.pos.x === robot.pos.x)
    const walls = potWay.filter(tile => tile.ttype === TileType.Wall)
    const firstWall = walls.length === 1 ? walls[0] : walls.reduce((acc,value) => acc.pos.y < value.pos.y ? acc : value, walls[0])
    return potWay.filter(elem => elem.pos.y < firstWall.pos.y)
}

const takeWay = (move:Move, warehouse:Field[], robot:Field) => 
    (move === Move.Right) ? wayRight(warehouse,robot) : 
    (move === Move.Left) ? wayLeft(warehouse,robot) : 
    (move === Move.Down) ? wayDown(warehouse,robot) : wayUp(warehouse,robot)

const sortWayToGo = (nextFields:Field[], move:Move) =>
    (move === Move.Right) ? nextFields.sort((a,b) => a.pos.x - b.pos.x) :
    (move === Move.Left) ? nextFields.sort((a,b) => b.pos.x - a.pos.x) :
    (move === Move.Down) ? nextFields.sort((a,b) => a.pos.y - b.pos.y) :
    nextFields.sort((a,b) => b.pos.y - a.pos.y)

function nextWarehouse(warehouse: Field[], move: Move): Field[] {
    const robot = warehouse.find(elem => elem.ttype === TileType.Robot)!
    const allFieldsNextToTheRobot = takeWay(move, warehouse, robot)
    allFieldsNextToTheRobot.push(robot)

    // warehouse without the current way
    const cleanup = warehouse.filter(elem => !allFieldsNextToTheRobot.some(el => el.pos.x === elem.pos.x && el.pos.y === elem.pos.y))
    const sortedList = sortWayToGo(allFieldsNextToTheRobot, move)

    if (sortedList.length > 1) {
        // next field is free
        if (sortedList[1].ttype === TileType.Free) {
            sortedList[0].ttype = TileType.Free
            sortedList[1].ttype = TileType.Robot
        } else {
            const freeSpace = sortedList.filter(e => e.ttype === TileType.Free).length > 0
            if (freeSpace) {
                const throwBoxOverTheOthers = sortedList.findIndex(elem => elem.ttype === TileType.Free)
                sortedList[0].ttype = TileType.Free
                sortedList[1].ttype = TileType.Robot
                sortedList[throwBoxOverTheOthers].ttype = TileType.Box
            }
        }
    }
    sortedList.forEach(elem => cleanup.push(elem))
    return cleanup
}

function mapDirSignToMove(sign:string): Move {
    switch (sign) {
        case '^': return Move.Up
        case '>': return Move.Right
        case 'v': return Move.Down
        case '<': return Move.Left
        default: throw new Error('No matching found')
    }
}

function visualize(warehouse: Field[]) {
    const sortedList = warehouse.map(field => ({ ...field }))
    const width = Math.max(...sortedList.map(e => e.pos.x)) + 1
    const height = Math.max(...sortedList.map(e => e.pos.y)) + 1
    
    const output = Array.from({ length: height }, () => Array(width).fill(' '))

    sortedList.forEach(({ pos, ttype }) => {
        const sign = ttype == TileType.Wall ? '#' :
            ttype == TileType.Box ? 'O' :
            ttype == TileType.Free ? '.' : '@'
        output[pos.y][pos.x] = sign
    })
    console.log(output.map(row => row.join('')).join('\n'))
}

function getMovements(movements:string) {
    return movements.replace(/\n/g, '').split('').map(s => mapDirSignToMove(s))
}

function part1(input: string): number {
    const warehouseAndMovements = input.split('\n\n')
    const movements = getMovements(warehouseAndMovements[1])
    
    let warehouse = createWarehouse(warehouseAndMovements[0])
    //console.log('-#-------#-')
    //visualize(warehouse)
    movements.forEach(move => {
        //console.log(Move[move])
        warehouse = nextWarehouse(warehouse, move)
        //visualize(warehouse)
        //console.log()
    })
    //console.log('-#-------#-')

    return warehouse.filter(elem => elem.ttype === TileType.Box)
        .reduce((acc, tile) => acc += tile.pos.x + tile.pos.y * 100, 0)
}

function expandWarehouse(input: string): string[][]  {
    return input.split('\n').map(line => 
        line.split('').flatMap(char => {
            switch(char) {
                case '.': return ['.', '.']
                case '#': return ['#', '#']
                case '@': return ['@', '.']
                case 'O': return ['[', ']']
        }})) as string[][]
}
function createExpandedWarehouse(input:string[][]): Field[][] {
    return input.map((line, li) => line.flatMap((char, ci) => ({
        pos: { x: ci, y: li },
        ttype:  char === '#' ? TileType.Wall : char === '.' ? TileType.Free : char === '@' ? TileType.Robot : 
                char === '[' ? TileType.LBracket : TileType.RBracket
    })))
}
function findCandidates(warehouse: Field[][], robot: Field, move:Move) {
    function findUpperCandidates(robot: Field): Field[] | null {
        const [upperLeft, upperRight] = warehouse[robot.pos.y-1][robot.pos.x].ttype === TileType.LBracket ?
            [warehouse[robot.pos.y-1][robot.pos.x], warehouse[robot.pos.y-1][robot.pos.x+1]] :
            [warehouse[robot.pos.y-1][robot.pos.x-1], warehouse[robot.pos.y-1][robot.pos.x]]
            
        const elemAboveOfUpperLeft = warehouse[upperLeft.pos.y-1][upperLeft.pos.x]
        const elemAboveOfUpperRigth = warehouse[upperRight.pos.y-1][upperRight.pos.x]

        // termination codition: the robot can't do the step, if there is a wall
        if (elemAboveOfUpperLeft.ttype === TileType.Wall || elemAboveOfUpperRigth.ttype === TileType.Wall) return null

        // recursive case: left/right for the upper-Left/Right
        const leftResult = elemAboveOfUpperLeft.ttype === TileType.Free ? [] : findUpperCandidates(upperLeft)
        const rightResult = elemAboveOfUpperRigth.ttype === TileType.Free ? [] : findUpperCandidates(upperRight)

        if (leftResult === null || rightResult === null) return null

        return [upperLeft, upperRight, ...leftResult, ...rightResult]
    }
    function findLowerCandidates(robot: Field): Field[] | null {
        const [lowerLeft, lowerRight] = warehouse[robot.pos.y+1][robot.pos.x].ttype === TileType.LBracket ?
            [warehouse[robot.pos.y+1][robot.pos.x], warehouse[robot.pos.y+1][robot.pos.x+1]] :
            [warehouse[robot.pos.y+1][robot.pos.x-1], warehouse[robot.pos.y+1][robot.pos.x]]
            
        const elemAboveOfLowerLeft = warehouse[lowerLeft.pos.y+1][lowerLeft.pos.x]
        const elemAboveOfLowerRigth = warehouse[lowerRight.pos.y+1][lowerRight.pos.x]

        // termination codition: the robot can't do the step, if there is a wall
        if (elemAboveOfLowerLeft.ttype === TileType.Wall || elemAboveOfLowerRigth.ttype === TileType.Wall) return null

        // recursive case: left/right for the down-Left/Right
        const leftResult = elemAboveOfLowerLeft.ttype === TileType.Free ? [] : findLowerCandidates(lowerLeft)
        const rightResult = elemAboveOfLowerRigth.ttype === TileType.Free ? [] : findLowerCandidates(lowerRight)

        if (leftResult === null || rightResult === null) return null

        return [lowerLeft, lowerRight, ...leftResult, ...rightResult]
    }

    function findLeftCandidates(robot: Field): Field[] | null {
        const left = warehouse[robot.pos.y][robot.pos.x-1]
        const elemNextToLeft = warehouse[left.pos.y][left.pos.x-1]

        if (elemNextToLeft.ttype === TileType.Wall) return null

        const leftResult = elemNextToLeft.ttype === TileType.Free ? [] : findLeftCandidates(left)

        if (leftResult === null) return null
        return [left, ...leftResult]
    }

    function findRightCandidates(robot: Field): Field[] | null {
        const left = warehouse[robot.pos.y][robot.pos.x+1]
        const elemNextToRight = warehouse[left.pos.y][left.pos.x+1]

        if (elemNextToRight.ttype === TileType.Wall) return null

        const rightResult = elemNextToRight.ttype === TileType.Free ? [] : findRightCandidates(left)

        if (rightResult === null) return null
        return [left, ...rightResult]
    }

    if (move === Move.Up) return findUpperCandidates(robot) ?? []
    if (move === Move.Down) return findLowerCandidates(robot) ?? []
    if (move === Move.Left) return findLeftCandidates(robot) ?? []
    if (move === Move.Right) return findRightCandidates(robot) ?? []
    return []
}

const nextMove = (warehouse:Field[][],robot:Field, move:Move) => 
    move === Move.Up ? warehouse[robot.pos.y-1][robot.pos.x] :
    move === Move.Down ? warehouse[robot.pos.y+1][robot.pos.x] :
    move === Move.Left ? warehouse[robot.pos.y][robot.pos.x-1] :
    warehouse[robot.pos.y][robot.pos.x+1]

function updateWarehouse(warehouse:Field[][], move:Move): Field[][] {
    const robot = warehouse.flat().find(elem => elem.ttype === TileType.Robot)!

    const nm = nextMove(warehouse,robot,move)
    if (nm.ttype === TileType.Wall) return warehouse
    if (nm.ttype === TileType.Free) {
        warehouse[robot.pos.y][robot.pos.x].ttype = TileType.Free
        warehouse[nm.pos.y][nm.pos.x].ttype = TileType.Robot
        return warehouse
    }

    const candidates = findCandidates(warehouse, robot, move)
    if (candidates.length === 0) return warehouse

    // 1. cleanup:  replace all candidates from warehouse with Free
    candidates.push(robot)
    const copyCandidates = candidates.map(elem => ({ ...elem, pos: { ...elem.pos } }))
    candidates.forEach(elem => elem.ttype = TileType.Free)

    // 2. update:   
    // 2.1 Subtract the y-value from all candidates by 1 to go up
    switch(move) {
        case Move.Up: copyCandidates.forEach(elem => elem.pos.y -= 1); break
        case Move.Down: copyCandidates.forEach(elem => elem.pos.y += 1); break
        case Move.Left: copyCandidates.forEach(elem => elem.pos.x -= 1); break
        case Move.Right: copyCandidates.forEach(elem => elem.pos.x += 1); break
    }

    // 2.2 replace all fields in warehouse with Candidates
    copyCandidates.forEach(elem => warehouse[elem.pos.y][elem.pos.x].ttype = elem.ttype)
    return warehouse
}

function part2(input: string): number {
    const warehouseAndMovements = input.split('\n\n')
    const movements = getMovements(warehouseAndMovements[1])
    
    let warehouse = createExpandedWarehouse(expandWarehouse(warehouseAndMovements[0]))
    movements.forEach(move => {
        warehouse = updateWarehouse(warehouse, move)
    })
    return warehouse.flat().filter(elem => elem.ttype === TileType.LBracket)
        .reduce((acc, tile) => acc += tile.pos.x + tile.pos.y * 100, 0)
}

export async function run(input: string, optF: boolean): Promise<number> {
    return !optF ? part1(input) : part2(input)
}

export { part1, part2, findCandidates as barfoo, getMovements, createExpandedWarehouse, updateWarehouse, TileType, Field, Move }