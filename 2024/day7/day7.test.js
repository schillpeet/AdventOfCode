import { part1 } from "./day7";
import { describe, test, expect } from "vitest";

describe('advent of code: day7', () => {
    const EXAMPLE_INPUT = `190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20`

    test.skip('part1', () => {
        const result = part1(EXAMPLE_INPUT)
        expect(result).toBe(3749)
    })
})