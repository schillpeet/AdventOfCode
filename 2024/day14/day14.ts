type Coord = {
    x: number
    y: number
}
type Robots = {
    position: Coord
    velocity: Coord
}
function robots(input:string): Robots[] {
    return input.split('\n')
        .map(r => r.match(/-?\d+/g)?.map(s => Number(s)))
        .map(r => ({
            position: { x: r![0], y: r![1] },
            velocity: { x: r![2], y: r![3] }
        }))
}

// % ::= remainder operator, not the modulo operator!
// https://stackoverflow.com/questions/40692016/javascript-modulo-operator-behaves-differently-from-other-languages
const mod = (a:number, b:number) => ((a % b) + b) % b

function robotsFuturePosition(robots:Robots[], wide:number, tall:number, sec:number): Coord[] {
    return robots.map(rob => ({
        x: mod((rob.position.x + rob.velocity.x * sec), wide),
        y: mod((rob.position.y + rob.velocity.y * sec), tall)
    }))
}

function calculateSafetyFactor(wide:number, tall:number, futureRobots:Coord[]) {
    const wideLine = Math.floor(wide/2)
    const tallLine = Math.floor(tall/2)

    return futureRobots.reduce((quadrant, robot) => {
        if (robot.x === wideLine || robot.y === tallLine) return quadrant
        const idx = (robot.x < wideLine ? 0 : 2) + (robot.y < tallLine ? 0 : 1)
        quadrant[idx]++
        return quadrant
    }, [0, 0, 0, 0]).map(q => q || 1).reduce((result, q) => result * q, 1)
}

function part1(input: string, wide:number, tall:number): number {
    return calculateSafetyFactor(wide, tall, robotsFuturePosition(robots(input), wide, tall, 100))
}

/**
 * Generates a complete map with robots represented as '1's, 
 * while the empty space is filled with dots ('.').
 * 
 * @param coord - A list of coordinates representing the positions of the robots.
 * @returns A string array representing the entire map with robots and empty space.
 */
function getMapWithRobots(coord:Coord[]) {
    const emptyMap = ' '.repeat(103).split('').map(() => '.'.repeat(101))
    return emptyMap.map(e => e.split('')).map((e,idx1) => e.map(( value, idx2) => 
        coord.some(v => v.x === idx1 && v.y === idx2) ? '1' : '.'
    )).map(e => e.join(''))
}

/**
 * Validates whether the given position represents the top of a Christmas tree pattern 
 * within the provided map.
 * The Christmas Tree Coordinates based on this pattern:
 *   '....1....',
 *   '...111...',
 *   '..11111..',
 *   '.1111111.',
 *   '111111111',
 *   '...111...'
 * 
 * @param xMasMap - The complete map where each robot is marked with '1'. 
 *                  The rest of the map is filled with dots ('.').
 * @param curElem - The current element representing the peak of the Christmas tree.
 * @returns A boolean indicating whether the Christmas tree pattern is present.
 */
function validateChristmasOccurency(xMasMap: string[], curElem: Coord): Boolean {
    const bigXMasTreeToArray = xMasMap.map(line => line.split('')).flatMap((e, i) => e.map((e,j) => e==='1' ? [i,j] : null)).filter(Boolean)
    const xMasTreeCoords = [
        [curElem.x, curElem.y],

        [curElem.x+1, curElem.y-1], [curElem.x+1, curElem.y], [curElem.x+1, curElem.y+1],

        [curElem.x+2, curElem.y-2], [curElem.x+2, curElem.y-1], [curElem.x+2, curElem.y], [curElem.x+2, curElem.y+1], [curElem.x+2, curElem.y+2],

        [curElem.x+3, curElem.y-3], [curElem.x+3, curElem.y-2], [curElem.x+3, curElem.y-1], [curElem.x+3, curElem.y], [curElem.x+3, curElem.y+1],
        [curElem.x+3, curElem.y+2], [curElem.x+3, curElem.y+3],

        [curElem.x+4, curElem.y-4], [curElem.x+4, curElem.y-3], [curElem.x+4, curElem.y-2], [curElem.x+4, curElem.y-1], [curElem.x+4, curElem.y],
        [curElem.x+4, curElem.y+1], [curElem.x+4, curElem.y+2], [curElem.x+4, curElem.y+3], [curElem.x+4, curElem.y+4],

        [curElem.x+5, curElem.y-1], [curElem.x+5, curElem.y], [curElem.x+5, curElem.y+1]
    ]
    return xMasTreeCoords.every(e => bigXMasTreeToArray.some(m => e[0]===m![0] && e[1]===m![1]))
}

// NOTE: it takes 6m26s
function part2(input: string){
    let sec = 0
    while(sec < 10_000) {
        const robotsCoords = robotsFuturePosition(robots(input), 101, 103, sec)
        const xMasMap = getMapWithRobots(robotsCoords)
        if (robotsCoords.some(curRobot => validateChristmasOccurency(xMasMap, curRobot))) break
        sec++
    }
    return sec
}

export async function run(input: string, optF: boolean, optE: boolean): Promise<number|string> {
    if (!optF) return optE ? part1(input, 7, 11) : part1(input, 101, 103)
    return optE ? '🚨 Sry, there is no example solution for part2 🚨' : part2(input)
}

export { part1, robots, robotsFuturePosition }