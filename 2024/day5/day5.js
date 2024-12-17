function part1(input) {
    const [pageRulesStr, updatedPagesStr] = input.split('\n\n')

    const allNumbersOfRules = pageRulesStr.split(/[\|\n]/).map(Number)
    const firstNumbersOfRules = allNumbersOfRules.filter((_, idx) => idx % 2 === 0)
    const secNumbersOfRules = allNumbersOfRules.filter((_, idx) => idx % 2 !== 0)

    const rulesSuccessor = {}
    firstNumbersOfRules.map((key, idx) => {
        if (!rulesSuccessor[key]) rulesSuccessor[key] = []
        rulesSuccessor[key].push(secNumbersOfRules[idx])
    })
    
    const rulesPredecessor = {}
    secNumbersOfRules.map((key, idx) => {
        if (!rulesPredecessor[key]) rulesPredecessor[key] = []
        rulesPredecessor[key].push(firstNumbersOfRules[idx])
    })

    const correctUpdates = updatedPagesStr.split('\n').map(e => e.split(',').map(Number))
        .filter(list => {

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

            return (checkAllSuccessor || checkAllPredecessor)
        })
    
    // returns sum of middle page numbers
    return correctUpdates.reduce((acc, listOfNumbers) => {
        return acc += listOfNumbers[(listOfNumbers.length - 1) / 2]
    }, 0)
}

function part2(input) {
    console.log("Not Implemented")
    return -1
}

export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}
