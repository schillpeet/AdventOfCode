import { describe, expect, it } from "vitest"
import { readFile } from 'fs/promises'
import { clawMachines, part1, part2, clawMachines1000, lgs } from "./day13.ts"

describe('Advent of Code Tests: day 13, part 1', () => {
    
    it('should return the smallest number of tokens to win all the prices - (given result)', async () => {
        const machinesInput = await readFile('day13/example', 'utf-8')
        const minTokens = 480
        const part1Result = part1(machinesInput)
        expect(part1Result).toBe(minTokens)
    })

    it('should validate the pattern of the first clawMachine', () => {
        const firstClawMachineInput = "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400"
        const clawMachine = clawMachines(firstClawMachineInput)
        const expectedPattern = [{ buttonA: { x: 94, y: 34 }, buttonB: { x: 22, y: 67 }, prize: { x: 8400, y: 5400 } }]
        expect(clawMachine).toEqual(expectedPattern)
    })

    it('should validate the first clawMaines with LGS', () => {
        const firstClawMachineInput = "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400"
        const clawMachine = clawMachines(firstClawMachineInput)
        const cm = clawMachine[0]
        const output = lgs(cm.buttonA.x, cm.buttonA.y, cm.buttonB.x, cm.buttonB.y, cm.prize.x, cm.prize.y)

        const expected = 80 * 3 + 40
        expect(output).toBe(expected)
    })

    it('should validate the output of the first clawMachine', () => {
        const firstClawMachineInput = "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400"
        const output = part1(firstClawMachineInput)
        /**
         * A: x:94,     y:34
         * B: x:22,     y:67
         * P: x:8400,   y:5400
         */
        const expected = 80 * 3 + 40 // 280
        expect(output).toBe(expected)
    })
    
    it('should validate the output of the third clawMachine', () => {
        const thirdClawMachineInput = "Button A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450"
        const output = part1(thirdClawMachineInput)
        /**
         * Button A: X+17, Y+86     // A = 38 pushes
         * Button B: X+84, Y+37     // B = 86 pushes
         * Prize: X=7870, Y=6450
         */
        const expected = 38 * 3 + 86 // 200
        expect(output).toBe(expected)
    })

    it('should validate no combinations of the clawMachine', () => {
        const secClawMachineInput = "Button A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176"
        const secOutput = part1(secClawMachineInput)

        const fourthClawMachineInput = "Button A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279"
        const fourthOutput = part1(fourthClawMachineInput)

        expect(secOutput).toBe(0)
        expect(fourthOutput).toBe(0)
    })

    // -- further tests
    
    it('should return the smallest number of tokens to win all the prices - (wrong solution: too Low)', async () => {
        const machinesInput = await readFile('day13/puzzle', 'utf-8')
        const tooLow = 26062
        const part1Result = part1(machinesInput)
        expect(part1Result).toBeGreaterThan(tooLow)
    })
    
    it('should return the smallest number of tokens to win all the prices - (wrong solution: too Low)', async () => {
        const machinesInput = await readFile('day13/puzzle', 'utf-8')
        const tooLow = 30003
        const part1Result = part1(machinesInput)
        expect(part1Result).toBeGreaterThan(tooLow)
    })

    it('should return the smallest number of tokens to win all the prices - (wrong solution: too High)', async () => {
        const machinesInput = await readFile('day13/puzzle', 'utf-8')
        const tooHigh = 64515
        const part1Result = part1(machinesInput)
        expect(part1Result).toBeLessThan(tooHigh)
    })

    it.each([
        ['A: x:1, y:1; B: x:1, y:1; P: x:1, y:1', 1],   // A=0 && B=1
        ['A: x:1, y:1; B: x:1, y:1; P: x:2, y:2', 2],   // A=0 && B=2
        ['A: x:3, y:3, B: x:1, y:1, P: x:3, y:3', 3],   // A=1 && B=0 || A=0 && B=3
        ['A: x:0, y:0, B: x:0, y:0, P: x:0, y:0', 0],
    ])("simple tests cases with input: %s, expected: %i", (input, expected) => {
        expect(part1(input)).toBe(expected);
    })

    it('should validate 20 as output', () => {
        const input = 'A: x:3, y:4; B: x:8, y:2; P: x:34, y:28'
        expect(part1(input)).toBe(20);
    })

    it('should return 91', () => {
        const input = `12 26 60 39 924 1092`
        const output = part1(input)
        expect(output).toBe(91)
    })
    
    it('should return part1 result: 35255', async () =>{
        const input = await readFile('day13/puzzle', 'utf-8')
        const output = part1(input)
        expect(output).toBe(35255)
    })
})


describe('Advent of Code Tests: day 13, part 2', () => {
    
    it('should validate new input form for example 2', async () => {
        const inputExample = await readFile('day13/example', 'utf-8')
        const newCM = clawMachines1000(inputExample)

        const inputExample2 = await readFile('day13/example2', 'utf-8')
        const oldCM = clawMachines(inputExample2)

        expect(JSON.stringify(newCM)).toBe(JSON.stringify(oldCM))
    })

    it('should validate new example input', async () => {
        const input = await readFile('day13/example', 'utf-8')
        const output = part2(input)
        expect(output).toBe(875318608908)
    })

    it('should calculate new example 2 solution', () => {
        const cm2 = 'Button A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176'
        const output = part2(cm2)
        expect(output).toBe(459236326669)
    })

    it('should calculate new example 4 solution', () => {
        const cm4 = 'Button A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279'
        const output = part2(cm4)
        expect(output).toBe(416082282239)
    })

    it('should return 0, because you can not win it', () => {
        const cm1 = 'Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400'
        const cm3 = 'Button A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450'

        const output1 = part2(cm1)
        const output2 = part2(cm3)

        expect(output1).toBe(0)
        expect(output2).toBe(0)
    })

    it('should greater than 85155915190160 - (wrong solution) ', async () => {
        const input = await readFile('day13/puzzle', 'utf-8')
        const output = part2(input)
        expect(output).toBeGreaterThan(85155915190160)
    })
    
    it('final solution: 87582154060429', async () => {
        const input = await readFile('day13/puzzle', 'utf-8')
        const output = part2(input)
        expect(output).toBe(87582154060429)
    })
})