const hasNeighbour = (x1,y1,x2,y2) => Math.abs(x1 - x2) === 1 && y1 === y2 || Math.abs(y1 - y2) === 1 && x1 === x2

/**
 * 
 * @param {[[string, [number, number], number]]} todos
 * @param {[[string, [number, number], number]]} rest 
 * @returns 
 */
function niceFunctionName(todos, rest) {
    let todoList = [...todos]
    let finList = []

    while(todoList.length !== 0) {
        let head = todoList.shift()
        finList.push(head)

        /**
         * all neighbours that are not in the finish list and not in the todo list as well
         */
        const allNeighbours = rest.filter(e => hasNeighbour(head[1].at(0), head[1].at(1), e[1].at(0), e[1].at(1)))
            .filter(e => !finList.some(s => s[1].at(0) === e[1].at(0) && s[1].at(1) === e[1].at(1)))
            .filter(e => !todoList.some(s => s[1].at(0) === e[1].at(0) && s[1].at(1) === e[1].at(1)))
        allNeighbours.forEach(n => todoList.push(n))

    }
    return finList
}

function calculateRegions(list, result) {
    const [head, ...tail] = [...list]

    const myHead = [head]
    // @ts-ignore
    const oneRegion = niceFunctionName(myHead, tail)

    const restPlants = list.filter(e => !oneRegion.includes(e))
    result.push(oneRegion)
    if (restPlants.length === 0) return result
    return calculateRegions(restPlants, result)
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input 
 * @returns 
 */
function part1(input) { 
    const gardenMap = input
        .split('\n').map(line => line.split(''))
        .flatMap((arr, ai) => arr.map((elem, ei) => [elem, [ai,ei], 4]))       
    
    const theTruth = input
        .split('\n').flatMap(line => line.split(''))
    
    const allKindsOfPlants = theTruth.filter((e,i) => theTruth.indexOf(e) === i)
    
    let result = []
    allKindsOfPlants.forEach(plant => {
        const specificPlant = gardenMap.filter(e => e[0][0] === plant)
        calculateRegions(specificPlant, result)
    })
    
    // calculate fences per entry
    result.forEach(plantArea => {
        plantArea.map(p => {
            const numOfNeighbours = plantArea.filter(plant => hasNeighbour(p[1][0],p[1][1],plant[1][0], plant[1][1])).length
            p[2] -= numOfNeighbours
            return p
        })
    })
    
    let costs = 0
    result.forEach(plantArea => {
        const numOfPlantsInArea = plantArea.length
        const costsPerArea = plantArea.reduce((acc,value) => {
            const costsPerPlant = value[2] * numOfPlantsInArea
            return acc + costsPerPlant
        }, 0)
        costs += costsPerArea
    })

    return costs
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input 
 * @returns 
 */
function part2(input) {
    console.error("Not implemented yet!", input)    
    return -1
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input - including line breaks
 * @param {boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}

export { niceFunctionName }