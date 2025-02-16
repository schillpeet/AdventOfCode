const hasNeighbour = (x1,y1,x2,y2) => Math.abs(x1 - x2) === 1 && y1 === y2 || Math.abs(y1 - y2) === 1 && x1 === x2

/**
 * 
 * @param {[[string, [number, number], number]]} todos
 * @param {[[string, [number, number], number]]} rest 
 * @returns 
 */
function calcEachRegion(todos, rest) {
    let todoList = [...todos]
    let finList = []

    while(todoList.length !== 0) {
        let head = todoList.shift()
        finList.push(head)

        // all neighbours that are not in the finish list and not in the todo list as well
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
    const oneRegion = calcEachRegion(myHead, tail)

    const restPlants = list.filter(e => !oneRegion.includes(e))
    result.push(oneRegion)
    if (restPlants.length === 0) return result
    return calculateRegions(restPlants, result)
}

const getGardenMapPart1 = input => input
    .split('\n').map(line => line.split(''))
    .flatMap((arr, ai) => arr.map((elem, ei) => [elem, [ai,ei], 4]))

const getGardenMapPart2 = input => input
    .split('\n').map(line => line.split(''))
    .flatMap((arr, ai) => arr.map((elem, ei) => [elem, [ai,ei], [], []]))

const getMapToGetAllPlants = input => input.split('\n').flatMap(line => line.split(''))

const getAllKindsOfPlants = mapToGetAllPlants => mapToGetAllPlants.filter((e,i) => mapToGetAllPlants.indexOf(e) === i)

function calcRegionsForAllKindsOfPlants(allKindsOfPlants, gardenMap) {
    let result = []
    allKindsOfPlants.forEach(plant => {
        const specificPlant = gardenMap.filter(e => e[0][0] === plant)
        calculateRegions(specificPlant, result)
    })
    return result
}

function getAllRegions(input, part) {
    const gardenMap = part === 1 ? getGardenMapPart1(input) : getGardenMapPart2(input)   
    const mapToGetAllPlants = getMapToGetAllPlants(input)
    const allKindsOfPlants = getAllKindsOfPlants(mapToGetAllPlants)
    return calcRegionsForAllKindsOfPlants(allKindsOfPlants, gardenMap)
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input 
 * @returns 
 */
function part1(input) { 
    const allRegions = getAllRegions(input, 1)
    
    // calculate fences per entry
    allRegions.forEach(plantArea => {
        plantArea.map(p => {
            const numOfNeighbours = plantArea.filter(plant => hasNeighbour(p[1][0],p[1][1],plant[1][0], plant[1][1])).length
            p[2] -= numOfNeighbours
            return p
        })
    })
    
    let costs = 0
    allRegions.forEach(plantArea => {
        const numOfPlantsInArea = plantArea.length
        const costsPerArea = plantArea.reduce((acc,value) => {
            const costsPerPlant = value[2] * numOfPlantsInArea
            return acc + costsPerPlant
        }, 0)
        costs += costsPerArea
    })

    return costs
}

function getAllRegionsPart2(allRegions) {
    allRegions.forEach(plantArea => {
        plantArea.map(p => {
            // add coordinates of each neighbour
            const neighbours = plantArea.filter(plant => hasNeighbour(p[1][0],p[1][1],plant[1][0], plant[1][1]))
            neighbours.forEach(n => p[2].push(n.at(1)))
            // add N,E,S,W = border: N is North and means that there is a free area for a fence above the current element
            if (!p[2].some(n => n.at(0) === p[1].at(0) - 1)) p[3].push('N')
            if (!p[2].some(n => n.at(1) === p[1].at(1) + 1)) p[3].push('E')
            if (!p[2].some(n => n.at(0) === p[1].at(0) + 1)) p[3].push('S')
            if (!p[2].some(n => n.at(1) === p[1].at(1) - 1)) p[3].push('W')

            return p
        })
    })
    return allRegions
}

// north south
function groupByLevelVertical(entries) {
    return Object.values(entries.reduce((acc, [plantName, [x,y], neighbours, plantBorder]) => {
        if (!acc[x]) acc[x] = []
        acc[x].push([plantName, [x,y], neighbours, plantBorder])
        return acc
    }, {}))
}
// east west
function groupByLevelHorizontal(entries) {
    return Object.values(entries.reduce((acc, [plantName, [x,y], neighbours, plantBorder]) => {
        if (!acc[y]) acc[y] = []
        acc[y].push([plantName, [x,y], neighbours, plantBorder])
        return acc
    }, {}))
}
function groupByLinesVertical(entries) {
    const sortLines = entries.map(groups => groups.sort((a,b) => a[1][1] - b[1][1]))
    let reduceSortedList = []
    sortLines.forEach(groups => {
        let tmpRed = groups.reduce((acc, value) => {
            if (acc.length === 0) acc.push([value])
            else {
                const lastEntryValue = acc.at(-1).at(-1)[1][1]
                const curEntryValue = value[1][1]
                if (lastEntryValue === curEntryValue - 1) acc.at(-1).push(value)
                else acc.push([value])
            }
            return acc
        }, [])
        reduceSortedList.push(tmpRed)
    })
    return reduceSortedList
}

// east west
function groupByLinesHorizontal(entries) {
    const sortLines = entries.map(groups => groups.sort((a,b) => a[0][0] - b[0][0])) // sort by y
    let reduceSortedList = []
    sortLines.forEach(groups => {
        let tmpRed = groups.reduce((acc, value) => {
            if (acc.length === 0) acc.push([value])
            else {
                const findLineNeighbourIdx = acc.findIndex(lineGroup => lineGroup.some(lineEntry => 
                    lineEntry[1][1] === value[1][1] &&
                    lineEntry[1][0] === value[1][0] - 1 ||
                    lineEntry[1][0] === value[1][0] + 1
                ))
                if (findLineNeighbourIdx !== -1) acc[findLineNeighbourIdx].push(value)
                else acc.push([value])
            }
            return acc
        }, [])
        reduceSortedList.push(tmpRed)
    })
    return reduceSortedList
}
function countLines(entries) {
    const result = entries.reduce((total, group) => 
        total + group.reduce((sum, ) => sum += 1, 0)
    , 0)
    return result
}

function calcBorders(regionsWithBorderAnnotation) {
    const northCount = countLines(groupByLinesVertical(groupByLevelVertical(regionsWithBorderAnnotation.filter(elem => elem.at(3).includes('N')))))
    const southCount = countLines(groupByLinesVertical(groupByLevelVertical(regionsWithBorderAnnotation.filter(elem => elem.at(3).includes('S')))))

    const eastCount = countLines(groupByLinesHorizontal(groupByLevelHorizontal(regionsWithBorderAnnotation.filter(elem => elem.at(3).includes('E')))))
    const westCount = countLines(groupByLinesHorizontal(groupByLevelHorizontal(regionsWithBorderAnnotation.filter(elem => elem.at(3).includes('W')))))

    return northCount + eastCount + southCount + westCount
}

/**
 * JSDoc comments help IntelliSense to recognize the right types and make suggestions
 * @param {string} input 
 * @returns 
 */
function part2(input) {
    const allRegions = getAllRegions(input, 2)
    const regionsWithBorderAnnotation = getAllRegionsPart2([...allRegions])
    return regionsWithBorderAnnotation.reduce((acc, region) => acc += calcBorders(region) * region.length, 0);
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

export { calcEachRegion, part2, getAllRegions, getAllRegionsPart2 }
