import { describe, expect, it } from "vitest";
import { niceFunctionName } from "./day12.js";

/* const EXAMPLE_1 = 'AAAA\nBBCD\nBBCC\nEEEC'
const EXAMPLE_2 = 'OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO'
const EXAMPLE_3 = 'RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE'
 */
describe('Advent of Code Tests: day 11, part', () => {
    
    it('is a simple test that should return a group of plants', () => {
        const todos = [['A', [0,0], 4]] 
        const rest = [['A', [0,1], 4], ['A', [1,0], 4]]
        const exp = [['A', [0,0], 4], ['A', [0,1], 4], ['A', [1,0], 4]]
        // @ts-ignore 
        const output = niceFunctionName(todos, rest)
        
        expect(output).toStrictEqual(exp)
    })

    it('should group three plants and the last one ignore', () => {
        const todos = [['A', [0,0], 4]]
        const rest = [['A', [0,1], 4], ['A', [1,0], 4], ['A', [42,42], 4]]
        const exp = [['A', [0,0], 4], ['A', [0,1], 4], ['A', [1,0], 4]]

        // @ts-ignore
        const output = niceFunctionName(todos, rest)

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
        const output = niceFunctionName(todos, rest)

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
            const output = niceFunctionName(todos, rest)
    
            expect(output).toStrictEqual(exp)
        })

})