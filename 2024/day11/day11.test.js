import { describe, it, expect } from 'vitest';
import { part1, blink } from './day11.js'

describe('Advent of Code Tests: day 11, part1', () => {
    const INITAL_VALUE = [125, 17]

    it('validates output after no blink', async () => {
        const result = blink(INITAL_VALUE, 0)

        expect(result).toEqual(INITAL_VALUE);
        expect(result.length).toBe(2)
    });

    /**
     * multiplied 125 with 2024 and (rule 3)
     * splits 17 into 1 and 7 (rule 2)
     */
    it('validates output after one blink', async () => {
        const ONE_BLINK = [253000, 1, 7]
        const result = blink(INITAL_VALUE, 1)

        expect(result).toEqual(ONE_BLINK);
        expect(result.length).toBe(3)
    });

    
    /**
     * splits 253000 into 253 and 0 (rule 2) 
     * multiplied 1 with 2024 and (rule 3) 
     * multiplied 7 with 2024 and (rule 3)
     */
    it('validates output after two blinks', async () => {
        const TWO_BLINKS = [253, 0, 2024, 14168]
        const result = blink(INITAL_VALUE, 2)

        expect(result).toEqual(TWO_BLINKS);
        expect(result.length).toBe(4)
    });


    /**
     * multiplied 253 with 2024 and (rule 3)
     * replaces the 0 with a 1 (rule 1)
     * splits 2024 into 20 and 24 (rule 2)
     * multiplied 14168 with 2024 and (rule 3)
     */
    it('validates output after three blinks', async () => {
        const THREE_BLINKS = [512072, 1, 20, 24, 28676032]
        const result = blink(INITAL_VALUE, 3)

        expect(result).toEqual(THREE_BLINKS);
        expect(result.length).toBe(5)
    });

    it('validates output after six blinks', async () => {
        const SIX_BLINKS = [2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8, 6, 7, 6, 0, 3, 2]
        const result = blink(INITAL_VALUE, 6)

        expect(result).toEqual(SIX_BLINKS);
        expect(result.length).toBe(22)
    });

    it('validates output after 25 blinks', async () => {
        const origInput = INITAL_VALUE.join(' ')
        const result = part1(origInput)

        expect(result).toBe(55312)
    });
});
