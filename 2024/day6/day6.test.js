import { wayToMove, part1 } from './day6.js'

import { describe, test, expect } from 'vitest'

describe('Advent of Code Tests: day 6', () => {
    describe('Part 1 Tests', () => {
        const EXAMPLE_LAB = [ [ '.', '.', '.', '.', '#', '.', '.', '.', '.', '.' ], [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '#' ], [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ], [ '.', '.', '#', '.', '.', '.', '.', '.', '.', '.' ], [ '.', '.', '.', '.', '.', '.', '.', '#', '.', '.' ], [ '.', '.', '.', '.', '.', '.', '.', '.', '.', '.' ], [ '.', '#', '.', '.', '^', '.', '.', '.', '.', '.' ], [ '.', '.', '.', '.', '.', '.', '.', '.', '#', '.' ], [ '#', '.', '.', '.', '.', '.', '.', '.', '.', '.' ], [ '.', '.', '.', '.', '.', '.', '#', '.', '.', '.' ] ]
        const EXAMPLE_GUARD_POSITION = [ 6, 4 ]
        test(`validates the correctness of the given result`, async() => {
            const part1Result = part1(EXAMPLE_LAB, EXAMPLE_GUARD_POSITION)
            expect(part1Result).toBe(41)
        })
    })

    describe('Validates correct movements of wayToMove', () => {
        const testCases = [
            {
                direction: '^',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', '^', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: false,
                expectedNewPosition: [0, 1]
            },
            {
                direction: '^',
                guardPosition: [0, 1],
                lab: [
                    ['.', '^', '.'],
                    ['.', '.', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: true,
                expectedObstruction: false,
                expectedNewPosition: [0, 1]
            },
            {
                direction: '^',
                guardPosition: [1, 1],
                lab: [
                    ['.', '#', '.'],
                    ['.', '^', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: true,
                expectedNewPosition: [1, 1]
            },
            {
                direction: '>',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', '>', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: false,
                expectedNewPosition: [1, 2]
            },
            {
                direction: '>',
                guardPosition: [1, 2],
                lab: [
                    ['.', '.', '.'],
                    ['.', '.', '>'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: true,
                expectedObstruction: false,
                expectedNewPosition: [1, 2]
            },
            {
                direction: '>',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', '>', '#'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: true,
                expectedNewPosition: [1, 1]
            },
            {
                direction: 'v',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', 'v', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: false,
                expectedNewPosition: [2, 1]
            },
            {
                direction: 'v',
                guardPosition: [2, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', '.', '.'],
                    ['.', 'v', '.']
                ],
                expectedEndOfMap: true,
                expectedObstruction: false,
                expectedNewPosition: [2, 1]
            },
            {
                direction: 'v',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', 'v', '.'],
                    ['.', '#', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: true,
                expectedNewPosition: [1, 1]
            },
            {
                direction: '<',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['.', '<', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: false,
                expectedNewPosition: [1, 0]
            },
            {
                direction: '<',
                guardPosition: [1, 0],
                lab: [
                    ['.', '.', '.'],
                    ['<', '.', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: true,
                expectedObstruction: false,
                expectedNewPosition: [1, 0]
            },
            {
                direction: '<',
                guardPosition: [1, 1],
                lab: [
                    ['.', '.', '.'],
                    ['#', '<', '.'],
                    ['.', '.', '.']
                ],
                expectedEndOfMap: false,
                expectedObstruction: true,
                expectedNewPosition: [1, 1]
            },
        ];
    
        test.each(testCases)(
            
            'Validating movement for direction $direction with guard at $guardPosition (eom: $expectedEndOfMap, o: $expectedObstruction, newPos: $expectedNewPosition',
            ({ direction, guardPosition, lab, expectedEndOfMap, expectedObstruction, expectedNewPosition }) => {
                const [, , , move, nextStepEndOfMap, nextStepObstruction] = wayToMove(direction, guardPosition, lab);

                expect(nextStepEndOfMap(guardPosition)).toBe(expectedEndOfMap);
                expect(nextStepObstruction(guardPosition)).toBe(expectedObstruction);
    
                move(guardPosition);
                expect(guardPosition).toEqual(expectedNewPosition);
            }
        );
    });
})