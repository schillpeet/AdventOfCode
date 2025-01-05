function part1(input) {
    const filesAndFreeSpace = input.split('').flatMap((strNum, idx) => idx % 2 === 0 
            ? [...Array(Number(strNum))].map(() => idx/2)
            : [...Array(Number(strNum))].map(() => '.')
    );

    const filesAndFreeSpaceReverse = [...filesAndFreeSpace].reverse().flatMap(elem => typeof elem === 'number' ? elem: [])

    const numOfDots = filesAndFreeSpace.reduce((acc, val) => val === '.' ? acc + 1 : acc, 0)

    const defragmentation = filesAndFreeSpace.flatMap(num => typeof num === 'number' ? num
        : (filesAndFreeSpaceReverse[0] && filesAndFreeSpaceReverse.splice(0,1))
    )
    defragmentation.splice( (-1) * numOfDots)

    const checksum = defragmentation.reduce((acc, value, idx) => acc += value * idx, 0)

    return checksum
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