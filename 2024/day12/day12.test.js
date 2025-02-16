import { describe, expect, it } from "vitest";
import { calcEachRegion, getAllRegions, getAllRegionsPart2, part2 } from "./day12.js";

const EXAMPLE_1 = 'AAAA\nBBCD\nBBCC\nEEEC'
const EXAMPLE_2 = 'OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO'
const EXAMPLE_3 = 'RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE'
const EXAMPLE_4 = 'AAAAAA\nAAABBA\nAAABBA\nABBAAA\nABBAAA\nAAAAAA'

describe('Advent of Code Tests: day 11, part 1', () => {
    
    it('is a simple test that should return a group of plants', () => {
        const todos = [['A', [0,0], 4]] 
        const rest = [['A', [0,1], 4], ['A', [1,0], 4]]
        const exp = [['A', [0,0], 4], ['A', [0,1], 4], ['A', [1,0], 4]]
        // @ts-ignore 
        const output = calcEachRegion(todos, rest)
        
        expect(output).toStrictEqual(exp)
    })

    it('should group three plants and the last one ignore', () => {
        const todos = [['A', [0,0], 4]]
        const rest = [['A', [0,1], 4], ['A', [1,0], 4], ['A', [42,42], 4]]
        const exp = [['A', [0,0], 4], ['A', [0,1], 4], ['A', [1,0], 4]]

        // @ts-ignore
        const output = calcEachRegion(todos, rest)

        expect(output).toStrictEqual(exp)
    })

    /**
     *      AAX
     *      AXA
     *      AAA
     */
    it('should calculate seven plants as one region', () => {
        const todos = [['A', [0,0], 4]]
        const rest = [['A', [0,1], 4], ['A', [1,0], 4], ['A', [1,2], 4], ['A', [2,0], 4], ['A', [2,1], 4], ['A', [2,2], 4]]
        const exp = [['A', [0,0], 4], ['A', [0,1], 4], ['A', [1,0], 4], ['A', [2,0], 4], ['A', [2,1], 4], ['A', [2,2], 4], ['A', [1,2], 4]]

        // @ts-ignore
        const output = calcEachRegion(todos, rest)

        expect(output).toStrictEqual(exp)
    })

    /**
     *      XXA
     *      XAA
     *      XAA
     */
    it('should calculate the right area on the right side', () => {
        const todos = [['A', [0,2], 4]]
        const rest = [['A', [1,1], 4], ['A', [1,2], 4], ['A', [2,1], 4], ['A', [2,2], 4]]
        const exp = [['A', [0,2], 4], ['A', [1,2], 4], ['A', [1,1], 4], ['A', [2,2], 4], ['A', [2,1], 4]]

        // @ts-ignore
        const output = calcEachRegion(todos, rest)

        expect(output).toStrictEqual(exp)
    })
})

describe('Advent of Code Tests: day 11, part 2', () => {

    it('should return all Areas of plants', () => {
        const input = "AA\nAA"
        const allRegions = getAllRegions(input, 2)
        const exp = [[
            ['A', [0,0], [], []], 
            ['A', [0,1], [], []], 
            ['A', [1,0], [], []], 
            ['A', [1,1], [], []]
        ]]
        expect(allRegions).toStrictEqual(exp)
    })
    
    it('should return a list of plants with the information of the neighbours coordinates and the border in form of N,E,S,W', () => {
        const input = "AA\nAA"
        const allRegions = getAllRegions(input, 2)
        const regionsWithBorderAnnotation = getAllRegionsPart2(allRegions)
        const exp = [[
                        ['A', [0,0], [[0,1],[1,0]], ['N','W']], 
                        ['A', [0,1], [[0,0],[1,1]], ['N', 'E']], 
                        ['A', [1,0], [[0,0],[1,1]], ['S', 'W']], 
                        ['A', [1,1], [[0,1],[1,0]], ['E', 'S']]
                    ]]

        expect(regionsWithBorderAnnotation).toStrictEqual(exp)
    })

    it.skip('should return another list of plants with the information of the neighbours coordinates and the border in form of N,E,S,W', () => {
        const input = "AA\nBB\nAA"
        const allRegions = getAllRegions(input, 2)
        const regionsWithBorderAnnotation = getAllRegionsPart2(allRegions)
        const exp = [[
                        ['A', [0,0], [[0,1],[1,0]], ['N','W']],     ['A', [0,1], [[0,0],[1,1]], ['N', 'E']]
                    ],[
                        ['B', [1,0], [[0,0],[0,1],[1,1]], ['E']],   ['B', [1,1], [[0,1],[1,0],[2,1]], ['W']]
                    ],[
                        ['A', [2,0], [[1,0],[2,1]], ['S','W']],     ['A', [2,1], [[2,0],[1,1]], ['E', 'S']]
                    ]]

        expect(regionsWithBorderAnnotation).toStrictEqual(exp)
    })

    it('should validate the example input 1', () => {
        const exampleResult = part2(EXAMPLE_1)
        expect(exampleResult).toBe(80)
    })

    it('should validate the example input 2', () => {
        const exampleResult = part2(EXAMPLE_2)
        expect(exampleResult).toBe(436)
    })

    it('should validate the example input 3', () => {
        const exampleResult = part2(EXAMPLE_3)
        expect(exampleResult).toBe(1206)
    })

    it('should validate the example input 4', () => {
        const exampleResult = part2(EXAMPLE_4)
        expect(exampleResult).toBe(368)
    })
    

    it('should validate number of regions with borders', () => {
        const allRegions = getAllRegions(EXAMPLE_4, 2)
        const regionsWithBorderAnnotation = getAllRegionsPart2([...allRegions])
        const lengthResult = regionsWithBorderAnnotation.length
        expect(lengthResult).toBe(3)
    })

    // further tests
    it('simple test', () => {
        const input = "AA\nBB\nAA"
        const output = part2(input)
        expect(output).toBe(24)
    })

    it('simple test 2', () => {
        const input = "ABA\nBBB\nBAB\nBBB"
        const output = part2(input)
        expect(output).toBe(120)
    })

    it('test a snake', () => {
        const input = "AAAAAB\nABBBAA\nABAABA\nABABAA\nABAAAB\nAABBBB"
        const output = part2(input)
        expect(output).toBe(606)
    })

    it('tests another snake', () => {
        const input = "AAAAAB\nABBBAA\nABBABA\nABABAA\nABAAAB\nAABBBB"
        const output = part2(input)
        expect(output).toBe(542)
    })

    it('tests another ', () => {
        const input = "AAAAA\nABABA\nAAAAA"
        const output = part2(input)
        expect(output).toBe(164) 
    })
    it('tests another 2', () => {
        const input = "ABA\nBAB\nABA"
        const output = part2(input)
        expect(output).toBe(36) 
    })
    it('tests a special W in input file', () => {
        const input = `JJJJJWJEE
JJJJWWJEE
JJWJWWWWE
JJWWWWWEE
JWWWWWEEE
JJJWWWEEE
JJJJWWWJE
JJJJWJWJE
JJJJJJJJE`
        const output = part2(input)
        expect(output).toBe(1816)
    })

    it('should test the fences in all directions', () => {
        const input = 'AAxAAA\nAAxAAA\nxAAAxx\nAAxAAA\nAAxAAA\nAAxAAA'
        const output = part2(input)
        expect(output).toBe(592)
    })

})