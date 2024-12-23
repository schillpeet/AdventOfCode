function initCalibrationInput(input) {
    return input.split('\n').map(equ => equ.match(/\d+/g)).map(equ => {
        const [head, ...rest] = equ.map(e => Number(e))
        return { result: head, operands: rest }
    })
}

function calibrationTest(equ) {
    const ADD = (a,b) => a+b
    const MULT = (a,b) => a*b
    
    const expetedResult = equ.result
    const operands = equ.operands
    const numberOfPossibleCalculations = Math.pow(2, operands.length-1)

    let allCombinationsOfOperations = []
    for (let i = 0; i < numberOfPossibleCalculations; i++) {
        let binary = i.toString(2)
        if (binary.length <= operands.length-2){
            const toFill = (operands.length-1) - binary.length
            binary = '0'.repeat(toFill) + i.toString(2)
        }
        allCombinationsOfOperations.push(binary.split('').map(e => e === '0' ? ADD : MULT))
    }
    
    const foundOperation = allCombinationsOfOperations.some(op => {
        const [head, ...tail] = operands        
        const tmpCalculation = tail.reduce((acc, tValue, idx) => {
            return op[idx](acc, tValue)
        }, head)
                
        return expetedResult === tmpCalculation
    })
    return foundOperation ? expetedResult : 0
}

export function part1(input) { 
    const initCalib = initCalibrationInput(input)
     return initCalib.reduce((acc, value) => {
        return acc + calibrationTest(value)
    }, 0) 
}

function part2(input) {
    console.error("Not implemented yet!")    
    return -1
}

/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}
