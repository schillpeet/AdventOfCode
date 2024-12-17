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

    const correctUpdates = updatedPagesStr.split('\n').map(e => e.split(',').map(Number)) // array<array<Number>
        .filter(list => {                       // array<Number>, e.g. [75,47,61,53,29]
            const [head, ...tail] = list;       // head: [75], tail: [47,61,53,29]
            // TODO as 5183 was too high, I will now only validate the direct successors/predecessors
            const checkAllSuccessor = tail.every(t => rulesSuccessor[t] ? !rulesSuccessor[t].includes(head) : true);
            
            const [headP, ...tailP] = [...list].reverse()
            const checkAllPredecessor = tailP.every(t => rulesPredecessor[t] ? !rulesPredecessor[t].includes(headP) : true);

            console.log(checkAllSuccessor, checkAllPredecessor)

            return (checkAllSuccessor && checkAllPredecessor)
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
