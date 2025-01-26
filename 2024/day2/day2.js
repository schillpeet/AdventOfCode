/**
 * Checks whether all neighboring numbers are less than 4 apart and 
 * whether the sequence of numbers is either ascending or descending.
 * 
 * @param {number[]} numbers - An array of numbers to check.
 * @returns {boolean} - Returns true if all neighboring numbers are less than 4 apart 
 *                      and the sequence is either strictly increasing or decreasing.
 */
function part1(numbers) {
    let pairDuplicatesAnMaxDistance = numbers.slice(1).every((num, idx) => Math.abs(num - numbers[idx]) <= 3)
    let increasing = numbers.slice(1).every((num, idx) => num < numbers[idx])
    let decreasing = numbers.slice(1).every((num, idx) => num > numbers[idx])
    return pairDuplicatesAnMaxDistance && (increasing || decreasing)
}

/**
 * Checks if removing any one number from the array results in a valid sequence
 * as defined by the `part1` function.
 * 
 * @param {number[]} numbers - An array of numbers to check.
 * @returns {boolean} - Returns true if removing any number results in a valid sequence.
 */
function part2(numbers) {
    return numbers.some((_, idx) => {
        let newNumbers = numbers.filter((_, j) => j !== idx)
        return part1(newNumbers)
    })
}

/**
 * Processes the input and determines the result based on the options provided.
 * 
 * @param {string} input - A string of numbers, one set per line.
 * @param {boolean} optF - If true, also checks for the conditions of `part2`.
 * @returns {Promise<number>} - The final result based on the given input and options.
 */
export async function run(input, optF) {
    let result = 0
    input.split('\n').forEach(line => {
        let numbers = line.split(' ').map(Number)
        if (part1(numbers) && (result += 1)) return;
        if (optF && part2(numbers) && (result += 1)) return
    });
    return result
}