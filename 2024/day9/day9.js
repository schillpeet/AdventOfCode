function part1(input) {
    const filesAndFreeSpace = input.split('').flatMap((strNum, idx) => idx % 2 === 0 
            ? [...Array(Number(strNum))].map(() => idx/2)
            : [...Array(Number(strNum))].map(() => '.')
    )

    const filesAndFreeSpaceReverse = [...filesAndFreeSpace].reverse().flatMap(elem => typeof elem === 'number' ? elem: [])

    const numOfDots = filesAndFreeSpace.reduce((acc, val) => val === '.' ? acc + 1 : acc, 0)

    const defragmentation = filesAndFreeSpace.flatMap(num => typeof num === 'number' ? num
        : (filesAndFreeSpaceReverse[0] && filesAndFreeSpaceReverse.shift()))

    defragmentation.splice( (-1) * numOfDots)

    const checksum = defragmentation.reduce((acc, value, idx) => acc += value * idx, 0)

    return checksum
}

function part2(input) {
    let entries = input.split('').map((l,i) => {
        const isFile = i % 2 === 0
        const hasValue = Number(l)
        const idx = !isFile ? NaN : i/2
        return { file: isFile, value: hasValue, origIdx: idx }
    })

    let ls = []

    // adds element to ls list and removes from origin entries list
    function addsFilesOrFreeMem() {
        ls.unshift(entries.at(-1))
        entries.pop()
    }
    
    while(entries.length > 0) {
        // adds free space to the list or takes the last file element
        let lastFile = entries.at(-1)
        if (!lastFile.file || lastFile.isMoved || lastFile.value === 0 && !lastFile.file ) { addsFilesOrFreeMem(); continue }
        
        // validates if free mem exists for this file or adds this file
        let freeMemIdx = entries.findIndex(fm => !fm.file && fm.value >= lastFile.value)
        if (freeMemIdx === -1) { addsFilesOrFreeMem(); continue }
        
        // transforms lastFile space to free space and adds it to the list
        entries.slice(-1)[0].file = false
        addsFilesOrFreeMem()
        
        // transform freeMem to file completely
        if (entries[freeMemIdx].value === lastFile.value) {
            entries[freeMemIdx].file = true
            entries[freeMemIdx].isMoved = true
            entries[freeMemIdx].origIdx = lastFile.origIdx
            continue
        }
        
        // split free mem in file and free mem
        const copyFile = { file: true, value: lastFile.value, isMoved: true, origIdx: lastFile.origIdx }
        entries[freeMemIdx].value -= copyFile.value
        entries.splice(freeMemIdx, 0, copyFile)
    }

    // transforms the list of entities to the list like in the example: [1234] => [0..222....] 
    // (or: [0002220000], or zeros, as these are not counted)
    const visualList = ls.map(e => e.file ? Array(e.value).fill(e.origIdx) : Array(e.value).fill(0)).flat()

    let checksum = visualList
        .map((elem, i) =>  elem * i)
        .reduce((acc,value) => acc += value ,0)
    
    return checksum
}


/**
 * @param {String} input - including line breaks
 * @param {Boolean} optF - option final = true, means execute part 2
 * @returns 
 */
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input)
}
