/**
 * The idea is as follows:
 * We have an initial list of pairs of numbers, where the first number must always 
 * come before the second number (rule). This results in the pattern that 
 * in a list of n elements, one element also has n-1 predecessors, another element 
 * has n-2 predecessors, so the pattern shows a sorted list: 0, 1, ..., n-2, n-1, n. 
 * This means that I get a key that lies at a very specific index. In the end, I only 
 * have to take my second list, map it to the result of my first list and can then say 
 * whether the second list only has descending values or not.
 * 
 * NOTES: it could probably have been solved more simply
 */
function part1(input) {
    const [pageRulesStr, updatedPagesStr] = input.split('\n\n')

    /**
     * 1. transforms the first (Page Rule-) list to numbers
     * 2. takes all first numbers of the pairs
     * 3. initializes a new key if it does not yet exist or increments the value of the key
     */
    const counts = {}
    pageRulesStr
        .split(/[\|\n]/)
        .map(Number)
        .filter((_, idx) => idx % 2 === 0)
        .map(num => counts[num] = counts[num] ? counts[num] + 1 : 1) // counts the occurency of this first numbers
    
    /**
     * 1. transfomrs the seconde (Update-) list to numbers
     * 2. takes the values from the first list using the key (it returns the occurency)
     * 3. only keeps an array if the values are sorted in descending order
     */
    const correctUpdates = updatedPagesStr
        .split('\n').map(e => e.split(',').map(Number)) // array<array<number>>
        .map(arr => arr
            .map(value => counts[value] ? counts[value] : 0))
            .filter(arr => arr
                .every((num, idx) => 
                    idx === arr.length - 1 || num > arr[idx + 1])
            )
    
    // returns sum of middle page numbers
    return correctUpdates.reduce((acc, listOfNumbers) => {
        const valueToFind = listOfNumbers[(listOfNumbers.length - 1) / 2]
        const occurencyKeyOfValue = Number(Object.keys(counts).find(key => counts[key] === valueToFind))
        return acc += occurencyKeyOfValue
    }, 0)
}

function part2(input) {}

export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}
