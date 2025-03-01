type Position = { x: number, y: number }
type Field = { pos: Position, ttype: TileType }

enum TileType { Robot, Box, Free, Wall }
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

function part1(input: string): number {
    const warehouseAndMovements = input.split('\n\n')
    const movements = warehouseAndMovements[1].replace(/\n/g, '').split('').map(s => mapDirSignToMove(s))
    
    let warehouse = createWarehouse(warehouseAndMovements[0])
    console.log('-#-------#-')
    //visualize(warehouse)
    movements.forEach(move => {
        //console.log(Move[move])
        warehouse = nextWarehouse(warehouse, move)
        //visualize(warehouse)
        //console.log()
    })
    console.log('-#-------#-')

    return warehouse.filter(elem => elem.ttype === TileType.Box)
        .reduce((acc, tile) => acc += tile.pos.x + tile.pos.y * 100, 0)
}

function part2(input: string): number {
    return -1
}

export async function run(input: string, optF: boolean): Promise<number> {
    return !optF ? part1(input) : part2(input)
}

export { part1 }