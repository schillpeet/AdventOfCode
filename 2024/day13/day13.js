function clawMachines(input) {
    return input
        .split('\n\n')
        .map(cm => cm.match(/\d+/g)?.map(Number))
        .map(cm => ({
        buttonA: { x: cm[0], y: cm[1] },
        buttonB: { x: cm[2], y: cm[3] },
        prize: { x: cm[4], y: cm[5] }
    }));
}
const isIntegerAndGreaterThanZero = (num) => Math.floor(num) == num && num >= 0;
function* findMatches(ax, ay, bx, by, px, py) {
    for (let i = 0; i <= 100; i++) {
        const ax_cand = (px - bx * i) / ax;
        const ay_cand = (py - by * i) / ay;
        if (isIntegerAndGreaterThanZero(ax_cand) && isIntegerAndGreaterThanZero(ay_cand)) {
            const potPrize1 = ay * ax_cand + by * i === py ? ax_cand * 3 + i : null;
            const potPrize2 = ax * ay_cand + bx * i === px ? ay_cand * 3 + i : null;
            if (potPrize1 === null && potPrize2 === null)
                yield null;
            else if (potPrize1 === null)
                yield potPrize2;
            else if (potPrize2 === null)
                yield potPrize1;
            else
                yield potPrize1 < potPrize2 ? potPrize1 : potPrize2;
        }
    }
}
function findBestPrize(cm) {
    const sol = findMatches(cm.buttonA.x, cm.buttonA.y, cm.buttonB.x, cm.buttonB.y, cm.prize.x, cm.prize.y);
    let bestPrize = undefined;
    while (true) {
        const currentSolution = sol.next().value;
        if (currentSolution === undefined)
            break;
        if (currentSolution === null)
            continue;
        bestPrize = bestPrize == undefined ? currentSolution : currentSolution < bestPrize ? currentSolution : bestPrize;
    }
    return bestPrize == undefined ? 0 : bestPrize;
}
function part1(input) {
    return clawMachines(input).reduce((acc, value) => acc += findBestPrize(value), 0);
}
function part2(input) {
    return -1;
}
export async function run(input, optF) {
    return !optF ? part1(input) : part2(input);
}
export { part1, clawMachines, findMatches };
