import { describe, expect, it } from "vitest"
import { readFile } from 'fs/promises'
import { part1 } from "./day16.ts"

describe('Advent of Code Tests: day 16, part 1', () => {

    it('validates example 1 output', async() => {
        const input = await readFile('day16/example', 'utf-8')
        const output = part1(input)
        expect(output).toBe(7036)
    })

    it('validates example 2 output', async() => {
        const input = await readFile('day16/example2', 'utf-8')
        const output = part1(input)
        expect(output).toBe(11048)
    })
    
})