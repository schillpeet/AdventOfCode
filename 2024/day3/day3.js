const regMultiply = /mul\(\d*,\d*\)/g // Matches 'mul(a,b)' patterns.
const regNums = /\d+/g // Matches individual numbers.

/**
 * Part 1: Parses and extracts numerical values from all 'mul(a,b)' patterns in a given line.
 *
 * @param {string} line - The input string containing potential 'mul(a,b)' patterns.
 * @returns {Array<Array<number>>} - An array of number pairs extracted from the patterns, e.g., [[a, b], [c, d]].
 */
function part1(line) {
    return getMatches(line, regMultiply)
        .map(entry => entry[0].match(regNums).map(Number))
}

/**
 * Matches a given pattern in a string and collects the matches along with their positions.
 *
 * @param {string} line - The input string to search.
 * @param {RegExp} pattern - The regular expression to find matches.
 * @returns {Array<Array>} - An array of matches and their start positions, e.g., [['match', index]].
 */
const getMatches = (line, pattern) =>
    [...line.matchAll(pattern)].map(entry => [entry[0], entry.index])

/**
 * Computes ranges for valid operations based on 'do()' and 'don't()' markers in the string.
 *
 * Each 'do()' marks the start of a valid range, while each 'don't()' marks the end of the range.
 * Ranges are calculated from these markers to restrict valid operations.
 *
 * @param {string} line - The input string containing 'do()' and 'don't()' markers.
 * @returns {Array<Array<number>>} - An array of ranges, e.g., [[start1, end1], [start2, end2]].
 */

let rangeStarts = true
function computeRanges(line) {
    const regDoAndDont = /(do\(\)|don\'t\(\))/g
    const multMatches = getMatches(line, regDoAndDont)
        .map(value => value[0].length === 7 ? [false, value[1]] : [true, value[1]])

    /**
     * if the previous line ended with don't, the initial value 0 as an index for a 
     * valid range start is of course no longer valid and must be removed afterwards
     */
    const RANGE_STATE = rangeStarts
    
    const ranges = multMatches.reduce((acc, value) => {
        if (rangeStarts && !value[0]) {
            rangeStarts = false
            acc.push(value[1])
        } else if (!rangeStarts && value[0]) {
            rangeStarts = true
            acc.push(value[1])
        }
        return acc
    }, [0])
    
    if(!RANGE_STATE) {
        ranges.shift()
    }

    let result = ranges
        .map((value, idx, arr) => idx % 2 === 0 ? [value, arr[idx + 1] ?? line.length] : null)
        .filter(Boolean)
    return result
}

/**
 * Part 2: Extracts numerical values from 'mul(a,b)' patterns within valid ranges.
 *
 * Uses ranges defined by 'do()' and 'don't()' markers to filter valid patterns before extraction.
 *
 * @param {string} line - The input string containing potential 'mul(a,b)' patterns and range markers.
 * @returns {Array<Array<number>>} - An array of number pairs within valid ranges, e.g., [[a, b], [c, d]].
 */
function part2(line) {
    const ranges = computeRanges(line)
    return getMatches(line, regMultiply)
        .filter(entry => ranges.some(range => range[0] <= entry[1] && entry[1] <= range[1]))
        .map(entry => entry[0].match(regNums).map(Number))
}

/**
 * Processes input to calculate the sum of all valid operations from multiple lines.
 *
 * Depending on the flag `optF`, either part1 or part2 is executed for each line.
 * - Part1: Processes all 'mul(a,b)' patterns without range restrictions.
 * - Part2: Processes 'mul(a,b)' patterns within ranges defined by 'do()' and 'don't()'.
 *
 * @param {string} input - Multi-line string input where each line contains patterns to process.
 * @param {boolean} optF - Flag to switch between part1 (false) and part2 (true).
 * @returns {Promise<number>} - The total sum of all valid operations across all lines.
 */
export async function run(input, optF) {
    return input.split('\n').map(line => {
        let matchNums = !optF ? part1(line) : part2(line)
        return matchNums.map(num => num[0] * num[1]).reduce((acc, cur) => acc + cur, 0)
    }).reduce((acc, cur) => acc + cur, 0)
}
