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

    it('should validate final solution', async() => {
        const input = await readFile('day16/puzzle', 'utf-8')
        const output = part1(input)
        expect(output).toBe(114476)
    })

    it('should validates own example input', async () => {
        const input = '########\n#.....E#\n#.##.#.#\n#S.....#\n########'
        const output = part1(input)
        expect(output).toBe(1007)
    })

    /**
     * '#########'
     * '#E..#####'
     * '#.#.....#'
     * '#.#.##.##'
     * '#..S...##'
     * '#.#.##.##'
     * '#......##'
     * '#########'
     */
/*     it('check costs to all neighbours 1', () => {
        const input = '#########\n#E..#####\n#.#.....#\n#.#.##.##\n#..S...##\n#.#.##.##\n#......##\n#########'
        const output = tmpHelper(input)
        output.forEach(t => {
            if (t.pos.x === 3 && t.pos.y === 2) expect(t.costs).toBe(1002)
            if (t.pos.x === 3 && t.pos.y === 6) expect(t.costs).toBe(1002)
            if (t.pos.x === 1 && t.pos.y === 4) expect(t.costs).toBe(2002)
            if (t.pos.x === 6 && t.pos.y === 4) expect(t.costs).toBe(3)
        })
    }) */

    /**
     * '#####'
     * '#...#'
     * '#.#.#'
     * '#.S.#'
     * '#.#.#'
     * '#..E#'
     * '#####'
     */
/*     it('check costs to all neighbours 2', () => {
        const input = '#####\n#...#\n#.#.#\n#.S.#\n#.#.#\n#..E#\n#####'
        const output = tmpHelper(input)
        output.forEach(t => {
            if (t.pos.x === 1 && t.pos.y === 3) expect(t.costs).toBe(2001)
            if (t.pos.x === 3 && t.pos.y === 3) expect(t.costs).toBe(1)
        })
    }) */

    /**
     * '######'
     * '#...##'
     * '#.#.##'
     * '#....#'
     * '##S#.#'
     * '#....#'
     * '#.##.#'
     * '#...E#'
     * '######'
     */
/*     it('check costs to all neighbours 3', () => {
        const input = '######\n#...##\n#.#.##\n#....#\n##S#.#\n#....#\n#.##.#\n#...E#\n######'
        const output = tmpHelper(input)
        output.forEach(t => {
            if (t.pos.x === 2 && t.pos.y === 3) expect(t.costs).toBe(1001)
            if (t.pos.x === 2 && t.pos.y === 5) expect(t.costs).toBe(1001)
        })
    }) */

    /**
     * '#########'
     * '#...#####'
     * '#.#....##'
     * '#.#.##.##'
     * '#..S...##'
     * '#.#.#####'
     * '#.......#'
     * '#####.#.#'
     * '#####..E#'
     * '#########'
     */
/*     it('check costs to all neighbours 4', () => {
        const input = '#########\n#...#####\n#.#....##\n#.#.##.##\n#..S...##\n#.#.#####\n#.......#\n#####.#.#\n#####..E#\n#########'
        const output = tmpHelper(input)
        output.forEach(t => {
            if (t.pos.x === 3 && t.pos.y === 2) expect(t.costs).toBe(1002)
            if (t.pos.x === 1 && t.pos.y === 4) expect(t.costs).toBe(2002)
            if (t.pos.x === 3 && t.pos.y === 6) expect(t.costs).toBe(1002)
        })
    }) */
/* 
######
#...E#
#.##.#
#S...#
###### */
/*     it('checks without turnoffs', () => {
        const input =`######\n#...E#\n#.##.#\n#S...#\n######`
        const output = djikstra(input)
        expect(output).toBe(1005)
    })

    it('should return a list of all nodes and their costs', () => {
        const input = '########\n#.....E#\n#.##.#.#\n#S.....#\n########'
        const output = djikstra(input)
        expect(output).toBe(1007)
    })
*/        
}) 
/* 
########
#.....E#
#.##.#.#
#S.....#
########
*/