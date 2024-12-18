import { readFile, stat } from 'fs/promises'

const errMess = `Usage: node main.js <day> [options]\n
Arguments:
  <day>\tRequired. Must be a value between 'day1' and 'day24'.\n
Options:
  [-e]\t\t\tOptional. Loads the example file; without this option the puzzle is loaded directly.
  [-f]\t\t\tOptional. Loads the final solution (part2); otherwise solution 1 is printed.
  [-ef] or [-fe]\tOptional. Use both options to load the example file and output the final solution.\n
Examples:
  node main.js day1\t\tRuns with the puzzle input for day 1.
  node main.js day2 -e\t\tRuns with the example input for day 2.
  node main.js day3 -f\t\tOutputs the final solution for day 3.
  node main.js day5 -ef\t\tRuns with the example input and outputs the final solution for day 5.`;

const exampleSetPart1 = "Example Input Solution (Part 1): "
const exampleSetPart2 = "Example Input Solution (Part 2): "
const puzzleSetPart1 = "Puzzle Input Solution (Part 1): "
const puzzleSetPart2 = "Puzzle Input Solution (Part 2): "

function die() {
    console.error(errMess)
    process.exit(1)
}

/**
 * Parses command-line arguments and validates them.
 * @returns {{ day: string, optE: boolean, optF: boolean }}
 */
function parseArguments() {
    const regDay = /^day([1-9]|1[0-9]|2[0-4])$/
    const regOpt = /^-(e|f|ef|fe)$/

    let day = process.argv[2] && regDay.test(process.argv[2]) ? process.argv[2] : die()
    let opt = (process.argv[3] && regOpt.test(process.argv[3])) || 
        process.argv[3] === undefined ? process.argv[3] : die()

    const [optE, optF] = opt ? [opt.includes('e'), opt.includes('f')] : [false, false]
    return {day, optE, optF}
}

/**
 * Reads the input file and returns its content split into lines.
 * @param {string} inputPath - Path to the input file.
 * @returns {Promise<string[]>} - Array of lines from the file.
 */
async function loadInputFile(inputPath) {
    try {
        const loadInput = await readFile(inputPath, 'UTF-8')
        return loadInput
    } catch (err) {
        console.error('Error reading input file:', err)
        process.exit(1)
    }
}

/**
 * Dynamically imports and executes a day's module.
 * @param {string} scriptPath - Path to the day's script.
 * @param {string[]} input - Input data.
 * @param {boolean} optF - Whether to execute the final solution.
 * @returns {Promise<String>} - Result from the day's module.
 */
async function executeDayModule(scriptPath, input, optF) {
    try {
        const dayModule = await import(scriptPath)
        if (typeof dayModule.run !== 'function') {
            throw new Error('Module does not export a "run" function.')
        }
        return await dayModule.run(input, optF)
    } catch (err) {
        console.error('Error loading or running module:', err)
        process.exit(1)
    }
}

const fileExists = async path => !!(await stat(path).catch(e => false))

async function main() {
    const { day, optE, optF } = parseArguments();
    const exampleFile2Exists = await fileExists(`./${day}/example2`)
    const inputPath = optE ? (exampleFile2Exists && optF ? `./${day}/example2` : `./${day}/example`) : `./${day}/puzzle`;
    const scriptPath = `./${day}/${day}.js`;

    const input = await loadInputFile(inputPath);
    const result = await executeDayModule(scriptPath, input, optF);
    
    switch(true) {
        case (optE && !optF):
            console.log(exampleSetPart1 + result)
            break;
        case (optE && optF):
            console.log(exampleSetPart2 + result)
            break;
        case (!optE && !optF):
            console.log(puzzleSetPart1 + result)
            break;
        case (!optE && optF):
            console.log(puzzleSetPart2 + result)
            break;
    }
}

main().catch((err) => {
    console.error('Unexpected error:', err)
    process.exit(1)
})