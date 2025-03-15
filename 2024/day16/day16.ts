enum View { East, South, West, North }

type Pos = {
    x: number
    y: number
}
type Tile = {
    tile: string,
    pos: Pos,
    view: View,
    costs: number
}
type DirectionCosts = {
    view: View
    costs: number | undefined
}
type TurnoffCost = {
    name: Pos,
    view: View | undefined,
    curCosts: number
}

let mapTurnoffs:Pos[]
let initMaze: { tile: string, pos: { x: number, y: number } }[][] 

function mazeWithoutDeadEnds(input: string) {
    const maze = input.split('\n').map(line => line.split(''))
    const checkDeadEnd = (x:number,y:number) => [maze[y-1][x], maze[y+1][x], maze[y][x-1], maze[y][x+1]].filter(c => c === '#').length > 2
    while(1) {
        let isClean = true
        maze.forEach((l,y) => l.forEach((c,x)=> { if (c === '.' && checkDeadEnd(x,y)) { maze[y][x] = '#'; isClean = false } }))
        if (isClean) break
    }
    return maze
}
function allTurnoffs(maze:string[][]) {
    const checkTurnoff = (x:number,y:number) => [maze[y-1][x], maze[y+1][x], maze[y][x-1], maze[y][x+1]].filter(c => c === '.' || c === 'S' || c === 'E').length > 2    
    return maze.map((l,y) => l.map((c,x) => c === '#' ? [] : checkTurnoff(x,y) ? [x,y] : [])).flat().filter(arr => arr.some(Boolean))
}

function ghostRiderDirection(direction:View): View {
    return [View.East, View.West].includes(View.East + View.West - direction) ? 
        (View.East + View.West - direction) as View :
        (View.North + View.South - direction) as View
}

const checkDirectionAndCosts = (pointer:Tile):DirectionCosts[] => {
    const checkCosts = (currentView:View, view:View) => {
        const twoThousandPlus = 
            (view === View.East || view === View.West) && (currentView === View.East || currentView === View.West) ||
            (view === View.North || view === View.South) && (currentView === View.North || currentView === View.South)
        return view === currentView ? 1 : twoThousandPlus ? 2001 : 1001
    }
    const { x, y } = pointer.pos
    const north = ['.','E','S'].includes(initMaze[y-1][x].tile) ? checkCosts(pointer.view, View.North) : undefined
    const east = ['.','E','S'].includes(initMaze[y][x+1].tile) ? checkCosts(pointer.view, View.East) : undefined
    const south = ['.','E','S'].includes(initMaze[y+1][x].tile) ? checkCosts(pointer.view, View.South) : undefined
    const west = ['.','E','S'].includes(initMaze[y][x-1].tile) ? checkCosts(pointer.view, View.West) : undefined

    return [{ view:View.North, costs: north }, { view:View.East, costs: east }, { view:View.South, costs: south },
        { view:View.West, costs: west }].filter(e => e.costs !== undefined)
}

const nextStep: Record<View, Pos> = {
    [View.East]: { x: 1, y: 0 }, [View.West]:  { x: -1, y: 0 },
    [View.South]: { x: 0, y: 1 }, [View.North]: { x: 0, y: -1 }
}

function findCostsToEveryNeighbour(pointer:Tile) {
    function walkYourWay(pointer:Tile, view:View, costs:number):Tile {
        const next = nextStep[view]
        pointer.pos.x += next.x
        pointer.pos.y += next.y
        
        const foundTurnoff = mapTurnoffs.find(e => e.x === pointer.pos.x && e.y === pointer.pos.y)
        if (foundTurnoff === undefined) {
            const nextWay = checkDirectionAndCosts(pointer)
            const findContraDirection = ghostRiderDirection(view)
            const nextView = nextWay.filter(e => e.view !== findContraDirection)[0]
            costs += nextView.costs!
            pointer.view = nextView.view
            return walkYourWay(pointer, nextView.view, costs)
        } 
        return { tile:'.', view: view, pos: { x: pointer.pos.x, y: pointer.pos.y }, costs: costs }
    }

    let xWaysToGo = checkDirectionAndCosts(pointer)
    if (pointer.tile !== 'S') xWaysToGo = xWaysToGo.filter(e => ghostRiderDirection(e.view) !== pointer.view)

    return xWaysToGo.map(way => {
        return walkYourWay({...pointer, pos: { ...pointer.pos }, view: way.view}, way.view, way.costs!)
    })
}

function mazeBasicInitialization(input:string) {
    const cleanedMaze:string[][] = mazeWithoutDeadEnds(input)
    initMaze = cleanedMaze.map((l,li) => l.map((c,ci) => ({ tile: c, pos: { x: ci, y: li} })))
    mapTurnoffs = allTurnoffs(cleanedMaze).map(turnoff =>  ({ x: turnoff[0], y: turnoff[1] }))
    const end = initMaze.flat().find(e => e.tile === 'E')!
    mapTurnoffs.push(end.pos) // adds the end as node too
}

const removeDupOfSameNode = (costToNeighbour:Tile[]) => Object.values(
    costToNeighbour.reduce((acc: { [key: string]: Tile }, value) => {
        const key = `${value.pos.x},${value.pos.y}`
        acc[key] = (!acc[key] || value.costs < acc[key].costs) ? value : acc[key]
        return acc
    }, {})
)

function djikstraInit(input:string) {
    mazeBasicInitialization(input)
    const reindeer:Tile = { ...initMaze.flat().find(e => e.tile === 'S')!, view: View.East, costs: 0 }

    const processList:TurnoffCost[] = mapTurnoffs.map(e => ({ name: e, view: undefined, curCosts: Infinity}))
    const finishedList:TurnoffCost[] = [{name: reindeer.pos, view: reindeer.view, curCosts: 0}]
    let sumOfAllNodes = mapTurnoffs.length

    function djikstraDoesIt(finishedList:TurnoffCost[], processList:TurnoffCost[], lastElement:Tile) 
        : [TurnoffCost[], TurnoffCost[], Tile]
    {
        if (sumOfAllNodes === 0) return [finishedList, processList, lastElement]

        const nextEdges = removeDupOfSameNode(findCostsToEveryNeighbour(lastElement))
            .map(e => ({...e, costs: e.costs += lastElement.costs}))

        const updateList = processList.map(e =>  {
            const findElement = nextEdges.find(ee => ee.pos.x === e.name.x && ee.pos.y === e.name.y)
            if (findElement !== undefined) return findElement.costs < e.curCosts ? { name: e.name, view: findElement.view, curCosts: findElement.costs } : e
            return e
        })

        const nextNode = updateList.reduce((acc,node) => {
            if (acc.curCosts > node.curCosts) acc = node
            return acc
        }, updateList[0])

        finishedList.push(nextNode)

        const nextUpdatedList = updateList.filter(e => !(e.name.x === nextNode.name.x && e.name.y === nextNode.name.y))
        const nextElement:Tile = { 
            tile: initMaze[nextNode.name.y][nextNode.name.x].tile, 
            pos: initMaze[nextNode.name.y][nextNode.name.x].pos,
            view: nextNode.view!,
            costs: nextNode.curCosts
        }

        sumOfAllNodes -= 1
        return djikstraDoesIt(finishedList, nextUpdatedList, nextElement)
    }
    const djikstraDidItAgain = djikstraDoesIt(finishedList, processList, reindeer)
    const end = initMaze.flat().find(e => e.tile === 'E')!
    return djikstraDidItAgain[0].find(e => e.name.x === end.pos.x && e.name.y === end.pos.y)!.curCosts
}

function part1(input: string): number {
    return djikstraInit(input)
}

function part2(input: string): number {
    return -1
}

export async function run(input: string, optF: boolean): Promise<number> {
    return !optF ? part1(input) : part2(input)
}

export { part1 }