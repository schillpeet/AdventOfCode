import { describe, expect, it } from "vitest"
import { readFile } from 'fs/promises'
import { part1 } from "../day13/day13.ts"

describe('Advent of Code Tests: day 15, part 1', () => {

    it('should validate the output of the first example', async() => {
        const input = await readFile('day15/example', 'utf-8')
        const output = part1(input)
        expect(output).toBe(10092)
    })

    it('should validate the output of the second example', async() => {
        const input = await readFile('day15/example2', 'utf-8')
        const output = part1(input)
        expect(output).toBe(2028)
    })
    
})