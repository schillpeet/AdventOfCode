function part1(list1, list2) {
    const sorted1 = [...list1].sort()
    const sorted2 = [...list2].sort()
    return sorted1.map((elem, idx) => 
        Math.abs(elem - sorted2[idx])).reduce((sum,a) => 
            sum + a, 0)
}

function part2(list1, list2) {
    const countedList2 = list2.reduce((acc, cur) => {
        acc[cur] = (acc[cur] ?? 0) + 1
        return acc
    }, {})
    const multiplied = list1.map(num => num * (countedList2[num] ?? 0))
    return Object.values(multiplied).reduce((acc, cur) => acc + cur, 0)
}

function createLists(input) {
    let str = input.split('\n')
    const list1 = str.map(e => parseInt(e.split(' ').at(0)))
    const list2 = str.map(e => parseInt(e.split(' ').at(-1)))
    return [list1, list2]
}
export async function run(input, optF) {
    let [list1, list2] = createLists(input)
    return !optF ? part1(list1, list2) : part2(list1, list2)
}