function part1(input) {
    const city = input.split('\n').map(e => e.split(''))
    const antennas = {} // antenna types and coordinates, e.g. { '0': [ [ 1, 8 ], [ 2, 5 ] ] }
    city.map((arr, arrIdx) => arr.flatMap((elem, elemIdx) => elem !== '.' ? (antennas[elem] = antennas[elem] ?? []).push([arrIdx, elemIdx]) : []) )

    const allAntinodes = Object.values(antennas).map(myArr => {
        return myArr.flatMap(base => {
          const others = myArr.filter(arrEntries => {
            return arrEntries[0]!==base[0] || arrEntries[1]!==base[1]
          })
          const antinodes = others.map(arrOthers => {
            const diff = [base[0] - arrOthers[0], base[1] - arrOthers[1]]
            return [arrOthers[0] - diff[0], arrOthers[1] - diff[1]]
          })      
          return antinodes
        })
    })

    const cityXLength = city[0].length
    const cityYLength = city.length
    const antinodesInCity = allAntinodes.flatMap(kindOfAntinode => kindOfAntinode).filter(e =>
            e[0] >= 0 &&
            e[1] >= 0 &&
            e[0] < cityYLength &&
            e[1] < cityXLength
    )

    // removes overlapping of antennas and antinodes
    const allAntennas = Object.values(antennas)
    const filteredOverlapping = antinodesInCity.map(elem => {
        return elem.filter(value => !allAntennas.some(elem => elem[0] === value[0] && elem[1] === value[1]))
    })

    // removes overlapping of antinodes of different freqzences
    const filteredOverlappingOfSameFrequences = filteredOverlapping.filter((arr, index, self) =>
        index === self.findIndex((other) => 
            arr.length === other.length && arr.every((value, i) => value === other[i])
        )
    );

    return filteredOverlappingOfSameFrequences.length
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