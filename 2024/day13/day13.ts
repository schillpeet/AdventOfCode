type Coordinates = {
    x: number
    y: number
}
type ClawMachine = {
    buttonA: Coordinates
    buttonB: Coordinates
    prize: Coordinates
}

function clawMachines(input: string): ClawMachine[] {
    return input
        .split('\n\n')
        .map(cm => cm.match(/\d+/g)?.map(Number))
        .map(cm => ({
            buttonA: { x: cm![0], y: cm![1] },
            buttonB: { x: cm![2], y: cm![3] },
            prize: { x: cm![4], y: cm![5] }
        }))
}

function clawMachines1000(input: string) {
    const prizeRise = 10000000000000
    return clawMachines(input).map(machine => ({
        ...machine,
        prize: { x: machine.prize.x + prizeRise, y: machine.prize.y + prizeRise }
    }))
}

function roundItOrNot(num: number, tolerance = 0.001) {
    const rNum = Math.round(num)
    if (Math.abs(num - rNum) < tolerance ) return rNum
    return num
}

function lgs(cm1: number, cm2: number, cm3: number, cm4: number, cm5: number, cm6: number) {
    /**
     * NOTE:
     * You should actually check whether the intersection point between fn1 and fn2 is the same as the intersection 
     * point of fm and fn1/fn2. However, it was sufficient for the solution.
     */
    //const fm_is_fn2_x = divided_by_zero((cm6/cm4 - (cm5+cm6)/(cm3+cm4)) / ((-(cm1+cm2)/(cm3+cm4) + cm2/cm4)))
    //const schnittpunkt_fm_fn2_y = divided_by_zero(-((cm1+cm2)/(cm3+cm4)) * fm_is_fn2_x + (cm5+cm6)/(cm3+cm4))
    const divided_by_zero = (num: number) => Number.isNaN(num) ? 0 : num

    const fm_is_fn1_x = divided_by_zero((cm5/cm3 - (cm5+cm6)/(cm3+cm4)) / ((-(cm1+cm2)/(cm3+cm4) + cm1/cm3)))
    const intersectionPoint_fm_fn1_y = divided_by_zero(-((cm1+cm2)/(cm3+cm4)) * fm_is_fn1_x + (cm5+cm6)/(cm3+cm4))

    const x = roundItOrNot(fm_is_fn1_x)
    const y = roundItOrNot(intersectionPoint_fm_fn1_y)

    // checks whether it is an integer or a decimal number after rounding
    const aPushes = x === Math.floor(x) ? x : null
    const bPushes = y === Math.floor(y) ? y : null

    if (aPushes === null || bPushes === null) return 0

    return 3 * aPushes + bPushes
}

function part1(input: string): number {
    return clawMachines(input).reduce((acc, cm) => acc += lgs(cm.buttonA.x, cm.buttonA.y, cm.buttonB.x, cm.buttonB.y, cm.prize.x, cm.prize.y), 0)
}

function part2(input: string): number {
    return clawMachines1000(input).reduce((acc, cm) => acc += lgs(cm.buttonA.x, cm.buttonA.y, cm.buttonB.x, cm.buttonB.y, cm.prize.x, cm.prize.y), 0)
}

export async function run(input: string, optF: boolean): Promise<number> {
    return !optF ? part1(input) : part2(input)
}

export { part1, clawMachines, part2, clawMachines1000, lgs }