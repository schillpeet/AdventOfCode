function part1(input: string): number {
    return -1
}

function part2(input: string): number {
    return -1
}

export async function run(input: string, optF: boolean): Promise<number> {
    return !optF ? part1(input) : part2(input)
}
