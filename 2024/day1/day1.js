/**
 * Calculates the sum of absolute differences between corresponding elements of two sorted lists.
 * 
 * This function sorts both input lists and computes the absolute difference between each corresponding element
 * in the sorted lists. Then, it returns the sum of all these differences.
 * 
 * @param {number[]} list1 - The first list of numbers.
 * @param {number[]} list2 - The second list of numbers.
 * @returns {number} - The sum of absolute differences between the sorted elements of both lists.
 */
function part1(list1, list2) {
    const sorted1 = [...list1].sort()
    const sorted2 = [...list2].sort()
    return sorted1.map((elem, idx) => 
        Math.abs(elem - sorted2[idx])).reduce((sum,a) => 
            sum + a, 0)
}

/**
 * Calculates the sum of products of elements from the first list and their frequencies in the second list.
 * 
 * This function counts how many times each element appears in `list2` and multiplies each number in `list1`
 * by its frequency in `list2`. Finally, it returns the sum of these products.
 * 
 * @param {number[]} list1 - The first list of numbers.
 * @param {number[]} list2 - The second list of numbers.
 * @returns {number} - The sum of products of the elements from list1 and their frequencies in list2.
 */
function part2(list1, list2) {
    const countedList2 = list2.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1
        return acc
    }, {})
    const multiplied = list1.map(num => num * (countedList2[num] ?? 0))
    return Object.values(multiplied).reduce((acc, cur) => acc + cur, 0)
}

/**
 * Converts a string of space-separated numbers into two lists: one for the first numbers in each line,
 * and one for the last numbers.
 * @param {string} input - The input string containing space-separated numbers on each line.
 * @returns {[number[], number[]]} - An array containing two lists: the first and last numbers from each line.
 */
function createLists(input) {
    let str = input.split('\n')
    const list1 = str.map(e => parseInt(e.split(' ').at(0)))
    const list2 = str.map(e => parseInt(e.split(' ').at(-1)))
    return [list1, list2]
}

/**
 * Executes the correct part of the solution based on the `optF` flag.
 * @param {string} input - The input string to be processed into lists.
 * @param {boolean} optF - A flag that determines whether to call `part1` (if `false`) or `part2` (if `true`).
 * @returns {number} - The result from either `part1` or `part2` based on the `optF` flag.
 */
export async function run(input, optF) {
    let [list1, list2] = createLists(input)
    return !optF ? part1(list1, list2) : part2(list1, list2)
}