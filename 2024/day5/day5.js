function getSuccessorAndPredecessor(allNumbersOfRules) {
    const firstNumbersOfRules = allNumbersOfRules.filter((_, idx) => idx % 2 === 0)
    const secNumbersOfRules = allNumbersOfRules.filter((_, idx) => idx % 2 !== 0)

    const rulesSuccessor = {}
    firstNumbersOfRules.map((key, idx) => {
        if (!rulesSuccessor[key]) rulesSuccessor[key] = []
        rulesSuccessor[key].push(secNumbersOfRules[idx])
    })
    return rulesSuccessor
}

function getCorrectOrWrongUpdates(part, updatedPagesArr, rulesSuccessor) {
    return updatedPagesArr.filter(list => {

        const checkAllSuccessor = list.reduce((acc, elem) => {
            const headTemp = elem
            const tailTemp = list.slice(acc[0])
            const checkSuccessor = tailTemp.every(t => rulesSuccessor[t] ? !rulesSuccessor[t].includes(headTemp) : true);
            acc[1] = acc[1] && checkSuccessor
            acc[0] += 1
            return acc
        }, [0, true])[1]
        
        const checkAllPredecessor = [...list].reverse().reduce((acc, elem) => {
            const headTemp = elem
            const tailTemp = list.slice(acc[0])
            const checkPredecessor = tailTemp.every(t => rulesSuccessor[t] ? !rulesSuccessor[t].includes(headTemp) : true);
            acc[1] = acc[1] && checkPredecessor
            acc[0] += 1
            return acc
        }, [0, true])[1]

        return part === 1 ? (checkAllSuccessor || checkAllPredecessor) : (!checkAllSuccessor && !checkAllPredecessor)
    })
}

function sumOfMiddlePageNumbers(correctUpdates) {
    return correctUpdates.reduce((acc, listOfNumbers) => {
        return acc += listOfNumbers[(listOfNumbers.length - 1) / 2]
    }, 0)
}

function compareFkt(rulesSuccessor) {
    return (a, b) => {
        const rule = rulesSuccessor[b] ? rulesSuccessor[b] : false
        if (rule && rulesSuccessor[b].includes(a)) return 1
        return -1  
    }
}

function correctlyOrderedUpdates(wrongUpdates, rulesSuccessor) {
    return wrongUpdates.map((list) => list.sort(compareFkt(rulesSuccessor)))
}

function part1(updatedPagesArr, rulesSuccessor) {      
    const correctUpdates = getCorrectOrWrongUpdates(1, updatedPagesArr, rulesSuccessor)
    return sumOfMiddlePageNumbers(correctUpdates)
}

function part2(updatedPagesArr, rulesSuccessor) {
    const wrongUpdates = getCorrectOrWrongUpdates(2, updatedPagesArr, rulesSuccessor)
    const corrOrdUpd = correctlyOrderedUpdates(wrongUpdates, rulesSuccessor)
    return sumOfMiddlePageNumbers(corrOrdUpd)
}

export async function run(input, optF) {
    const [pageRulesStr, updatedPagesStr] = input.split('\n\n')
    const allNumbersOfRules = pageRulesStr.split(/[\|\n]/).map(Number)
    const updatedPagesArr = updatedPagesStr.split('\n').map(e => e.split(',').map(Number))
    
    const rulesSuccessor = getSuccessorAndPredecessor(allNumbersOfRules) 
    return !optF ? part1(updatedPagesArr, rulesSuccessor) : part2(updatedPagesArr, rulesSuccessor)
}
