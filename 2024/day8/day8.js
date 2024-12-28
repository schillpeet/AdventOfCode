// filters only antinodes inside the map
function antinodesInCity(antinodes, cityXLength, cityYLength) {
    return antinodes.flatMap(kindOfAntinode => kindOfAntinode).filter(e =>
        e[0] >= 0 &&
        e[1] >= 0 &&
        e[0] < cityYLength &&
        e[1] < cityXLength)
}

// removes overlapping of antinodes of different freqzences
function filteredOverlappingOfSameFrequences(antinodesArr) {
    return antinodesArr.filter((arr, index, self) =>
        index === self.findIndex((other) => 
            arr.length === other.length && arr.every((value, i) => value === other[i])
        )
    );
}

function filterValidAntinodes(cityXLength, cityYLength, antennas, antinodes) {
    const aic = antinodesInCity(antinodes, cityXLength, cityYLength)

    // removes overlapping of antennas and antinodes
    const allAntennas = Object.values(antennas)
    const filteredOverlapping = aic.map(elem => {
        return elem.filter(value => !allAntennas.some(elem => elem[0] === value[0] && elem[1] === value[1]))
    })

    return filteredOverlappingOfSameFrequences(filteredOverlapping)
}

function part1(city, antennas) {
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
    const filteredAntinodes = filterValidAntinodes(cityXLength, cityYLength, antennas, allAntinodes)
    
    return filteredAntinodes.length
}

function part2(city, antennas) {
    const cityXLength = city[0].length
    const cityYLength = city.length

    const allAntinodes = Object.values(antennas).map(myArr => {
        return myArr.flatMap(base => {
            const others = myArr.filter(arrEntries => {
                return arrEntries[0]!==base[0] || arrEntries[1]!==base[1]
            })
            
            let antinodes = {}
            antinodes = others.flatMap(arrOthers => {
                const diff = [base[0] - arrOthers[0], base[1] - arrOthers[1]]
                let finished = false
                let sumUpAntinodes = []
                let currentAntinode = [arrOthers[0] - diff[0], arrOthers[1] - diff[1]]

                // frequencies of antennas in one line has to add as well
                sumUpAntinodes.push(base)
                
                while(!finished) {
                    const antinode = [currentAntinode[0], currentAntinode[1]]
                    if (antinode[0] < 0 || 
                        antinode[0] >= cityYLength || 
                        antinode[1] < 0 || 
                        antinode[1] >= cityXLength) 
                    {finished = true; break}
            
                    sumUpAntinodes.push(antinode)
                    currentAntinode = [antinode[0] - diff[0], antinode[1] - diff[1]]
                }
                return sumUpAntinodes
            })
            return antinodes
        })
    })

    const aic = antinodesInCity(allAntinodes, cityXLength, cityYLength)
    return filteredOverlappingOfSameFrequences(aic).length
}

/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    const city = input.split('\n').map(e => e.split(''))
    const antennas = {} // antenna types and coordinates, e.g. { '0': [ [ 1, 8 ], [ 2, 5 ] ] }
    city.map((arr, arrIdx) => arr.flatMap((elem, elemIdx) => elem !== '.' ? (antennas[elem] = antennas[elem] ?? []).push([arrIdx, elemIdx]) : []) )
    return !optF ? part1(city, antennas) : part2(city, antennas)
}