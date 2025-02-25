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

function part2(input: string): number {
    return -1
}

export async function run(input: string, optF: boolean, optE: boolean): Promise<number|string> {
    if (!optF) return optE ? part1(input, 7, 11) : part1(input, 101, 103)
    return optE ? '🚨 Sry, there is no example solution for part2 🚨' : part2(input)
}

export { part1, robots, robotsFuturePosition }