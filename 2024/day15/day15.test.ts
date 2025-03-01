import { describe, expect, it } from "vitest"
import { readFile } from 'fs/promises'
import { part1 } from "../day15/day15.ts"

describe('Advent of Code Tests: day 15, part 1', () => {

    it('should validate the output of the first example', async() => {
        const input = await readFile('day15/example', 'utf-8')
        const output = part1(input)
        expect(output).toBe(10092)
    })

    /**
     * expected:
     *      ########
     *      #....OO#
     *      ##.....#
     *      #.....O#
     *      #.#O@..#
     *      #...O..#
     *      #...O..#
     *      ########
     * 
     */
    it('should validate the output of the second example', async() => {
        const input = await readFile('day15/example2', 'utf-8')
        const output = part1(input)
        expect(output).toBe(2028)
    })

    /**
     *      #######
     *      #.....#
     *      #.@.O.#
     *      #.....#
     *      #######
     *
     *      Box-Coord. [x,y]: [4,2] -> x + y*100 => 4 + 2*100
     */
    it('should return an initial warehouse map', () => {
        const initialWarehouse = '#######\n#.....#\n#.@.O.#\n#.....#\n#######\n\n\n'
        const output = part1(initialWarehouse)
        expect(output).toBe(204)
    })

    /**
     *      #######
     *      #.....#
     *      #...@O#
     *      #.....#
     *      #######
     * 
     *      Box-Coord.: [5,2] -> x + y*100 => 5 + 2*100
     */
    it('should validate the warehouse after two step to the right', () => {
        const warehouse = 
            '#######\n' + 
            '#.....#\n' + 
            '#.@.O.#\n' + 
            '#.....#\n' + 
            '#######\n\n>>'
        const output = part1(warehouse)
        expect(output).toBe(205)
    })

    /**
     *      #######
     *      #.....#
     *      #.@.O.#
     *      #.....#
     *      #######
     */
    it('should validate random moves that never move the box', () => {
        const warehouse = 
            '#######\n' + 
            '#.....#\n' + 
            '#.@.O.#\n' +
            '#.....#\n' +
            '#######\n\n' +
            '>v>>^^^<<v<'
        const output = part1(warehouse)
        expect(output).toBe(204)
    })

    // ---
    // the following tests were only intended for interactive adaptation

    it.skip('should validate navigation', () => {
        const warehouse = 
            '#########\n' + 
            '#.......#\n' + 
            '#.......#\n' + 
            '#...@...#\n' +
            '#.......#\n' +
            '#.......#\n' + 
            '#########\n\n' +
            '>>>>>vvvvvvv<<<<<<<^^^^^^^^'
        part1(warehouse)
    })

    it.skip('move box right', () => {
        const warehouse = 
            '#######\n' + 
            '#.....#\n' + 
            '#.@.O.#\n' +
            '#.....#\n' +
            '#######\n\n' +
            '>>'
        part1(warehouse)
    })

    it.skip('deal with walls', () => {
        const warehouse = 
            '#########\n' + 
            '#.......#\n' +
            '#...#...#\n' + 
            '#...O...#\n' + 
            '#.#O@O#.#\n' +
            '#...O...#\n' +
            '#...#...#\n' + 
            '#.......#\n' +
            '#########\n\n' +
            '<>^v><v^'
        part1(warehouse)
    })

    it.skip('deal with boxes', () => {
        const warehouse = 
            '#########\n' + 
            '#.......#\n' +
            '#.......#\n' + 
            '#...O...#\n' + 
            '#..O@O..#\n' +
            '#...O...#\n' +
            '#.......#\n' + 
            '#.......#\n' +
            '#########\n\n' +
            '<<>>>><<^^vvvv^^' 
        part1(warehouse)
    })

    it.skip('deal with walls and boxes', () => {
        const warehouse = 
            '###########\n' + 
            '#.........#\n' +
            '#....#....#\n' + 
            '#.........#\n' +
            '#....O....#\n' + 
            '#.#.O@O.#.#\n' +
            '#....O....#\n' +
            '#.........#\n' + 
            '#....#....#\n' + 
            '#.........#\n' +
            '###########\n\n' +
            '^^vvv^>><<<>'
        part1(warehouse)
    })
})

