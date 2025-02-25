import { describe, expect, it } from "vitest"
import { readFile } from 'fs/promises'
import { part1, robots, robotsFuturePosition } from "../day14/day14.ts"

describe('Advent of Code Tests: day X, part 1', () => {

    it('should return part1 example 1 solution', async () => {
        const input = await readFile('day14/example', 'utf-8')
        const result = part1(input, 11, 7)
        expect(result).toBe(12)
    })

    it('should validate another example after 1 seconds with one robot', () => {
        const sec = 1
        const oneRobot = robots("p=2,4 v=2,-3")
        const movedRobot = robotsFuturePosition(oneRobot, 11, 7, sec).at(0)
        expect(movedRobot?.x).toBe(4)
        expect(movedRobot?.y).toBe(1)
    })

    it('should validate another example after 2 seconds with one robot', () => {
        const sec = 2
        const oneRobot = robots("p=2,4 v=2,-3")
        const movedRobot = robotsFuturePosition(oneRobot, 11, 7, sec).at(0)
        expect(movedRobot?.x).toBe(6)
        expect(movedRobot?.y).toBe(5)
    })

    it('should validate another example after 5 seconds with one robot', () => {
        const sec = 5
        const oneRobot = robots("p=2,4 v=2,-3")
        const movedRobot = robotsFuturePosition(oneRobot, 11, 7, sec).at(0)
        expect(movedRobot?.x).toBe(1)
        expect(movedRobot?.y).toBe(3)
    })

})