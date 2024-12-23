function initCalibrationInput(input) {
    return input.split('\n').map(equ => equ.match(/\d+/g)).map(equ => {
        const [head, ...rest] = equ.map(e => Number(e))
        return { result: head, operands: rest }
    })
}

function allCombinationsOfOperations(operandsLength, numberSystem) {
    const ADD = (a,b) => a+b
    const MULT = (a,b) => a*b
    const PIPE = (a,b) => Number(a.toString().concat(b))
    const numberOfPossibleCalculations = Math.pow(numberSystem, operandsLength-1)
    
    let allCombinationsOfOperations = []
    for (let i = 0; i < numberOfPossibleCalculations; i++) {
        let numSys = i.toString(numberSystem)
        
        if (numSys.length <= operandsLength-2){
            const toFill = (operandsLength-1) - numSys.length
            numSys = '0'.repeat(toFill) + i.toString(numberSystem)
        }
        allCombinationsOfOperations.push(numSys.split('').map(e => e === '0' ? ADD : e === '1' ? MULT : PIPE))
    }
    return allCombinationsOfOperations
}

function calibrationTest(equ, numSys) {
    const expetedResult = equ.result
    const operands = equ.operands
    const aCOO = allCombinationsOfOperations(operands.length, numSys)    
    
    const foundOperation = aCOO.some(op => {
        const [head, ...tail] = operands        
        const tmpCalculation = tail.reduce((acc, tValue, idx) => {
            return op[idx](acc, tValue)
        }, head)            
        return expetedResult === tmpCalculation
    })
    return foundOperation ? expetedResult : 0
}

function getResult(input, numberSystem) {
    const initCalib = initCalibrationInput(input)
     return initCalib.reduce((acc, value) => {
        return acc + calibrationTest(value, numberSystem)
    }, 0)
}

/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? getResult(input, 2) : getResult(input, 3)
}
