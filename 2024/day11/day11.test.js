import { describe, it, expect } from 'vitest';
import { part1, blink, numberOfStones } from './day11.js'

const EXAMPLE_INPUT = "125 17"
const PUZZLE_INPUT_STR = "6 11 33023 4134 564 0 8922422 688775"

const fromStringToArrayOfNumbers = (str) => str.split(' ').map(e => Number(e))

const EI = fromStringToArrayOfNumbers(EXAMPLE_INPUT)
const PI = fromStringToArrayOfNumbers(PUZZLE_INPUT_STR)


describe('Advent of Code Tests: day 11, part1', () => {
    
    it('validates output after no blink', async () => {
        const NO_BLINK = [125, 17] // it's just the initial value
        const result = blink(EI, 0)

        expect(result).toEqual(NO_BLINK);
        expect(result.length).toBe(2)
    });

    /**
     * multiplied 125 with 2024 and (rule 3)
     * splits 17 into 1 and 7 (rule 2)
     */
    it('validates output after one blink', async () => {
        const ONE_BLINK = [253000, 1, 7]
        const result = blink(EI, 1)

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
        const result = blink(EI, 2)

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
        const result = blink(EI, 3)

        expect(result).toEqual(THREE_BLINKS);
        expect(result.length).toBe(5)
    });

    it('validates output after six blinks', async () => {
        const SIX_BLINKS = [2097446912, 14168, 4048, 2, 0, 2, 4, 40, 48, 2024, 40, 48, 80, 96, 2, 8, 6, 7, 6, 0, 3, 2]
        const result = blink(EI, 6)

        expect(result).toEqual(SIX_BLINKS);
        expect(result.length).toBe(22)
    });

    it('validates output after 25 blinks', async () => {
        const result = part1(EXAMPLE_INPUT)

        expect(result).toBe(55312)
    });
});

describe('Advent of Code Tests: day 11, part2', () => {
    it('validates output after 25 blinks with example input', async () => {
        const result = numberOfStones(EI, 25)

        expect(result).toBe(55312)
    });

    it('validates output after 25 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 25)

        expect(result).toBe(220999)
    });

    it('validates output after 34 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 34)

        expect(result).toBe(9433638)
    });

    it('validates output after 35 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 35)

        expect(result).toBe(14324810)
    });

    it('validates output after 36 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 36)

        expect(result).toBe(21852234)
    });

    it('validates output after 39 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 39)

        expect(result).toBe(76379188)
    });

    it('validates output after 75 blinks with puzzle input', async () => {
        const result = numberOfStones(PI, 75)

        expect(result).toBe(261936432123724)
    });

    /**
     * validates memory functionallity
     */
    it('validates the memory: stone 0 after 10 blinks there should be 39 stones', async () => {
        const stringOfStones = "0"
        const blinks = 10
        const listOfStones = fromStringToArrayOfNumbers(stringOfStones)
        const result = numberOfStones(listOfStones, blinks, 0)

        expect(result).toBe(39)
    });

    it('validates the memory: stone 1after 6 blinks there should be 14 stones', async () => {
        const stringOfStones = "1"
        const blinks = 6
        const listOfStones = fromStringToArrayOfNumbers(stringOfStones)
        const result = numberOfStones(listOfStones, blinks, 0)

        expect(result).toBe(14)
    });

    it('validates the memory: stone 2 after 6 blinks there should be 12 stones', async () => {
        const stringOfStones = "2"
        const blinks = 6
        const listOfStones = fromStringToArrayOfNumbers(stringOfStones)
        const result = numberOfStones(listOfStones, blinks, 0)

        expect(result).toBe(12)
    });

    it('validates the memory: stone 1 after 13 blinks there should be 200 stones', async () => {
        const stringOfStones = "1"
        const blinks = 13
        const listOfStones = fromStringToArrayOfNumbers(stringOfStones)
        const result = numberOfStones(listOfStones, blinks, 0)

        expect(result).toBe(200)
    });

    it('validates the memory: stone 2 after 13 blinks there should be 181 stones', async () => {
        const stringOfStones = "2"
        const blinks = 13
        const listOfStones = fromStringToArrayOfNumbers(stringOfStones)
        const result = numberOfStones(listOfStones, blinks, 0)

        expect(result).toBe(181)
    });

});
