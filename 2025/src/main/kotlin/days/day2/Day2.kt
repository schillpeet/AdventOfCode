package aoc2025.days.day2

import aoc2025.days.DaysI

class Day2: DaysI {

    override fun part1(puzzleInput: List<String>): String {
        val ranges = puzzleInput.first().split(",").map { it.split("-") }
        var invalidIDs = 0L

        ranges.forEach { pair ->
            for (i in pair.first().toLong()..pair.last().toLong()) {
                val id = i.toString()
                if (id.length % 2 != 0) continue
                val firstDigits = id.take(id.length/2)
                val lastDigits = id.takeLast(id.length/2)
                if (firstDigits == lastDigits) invalidIDs += i
            }
        }

        return invalidIDs.toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        val ranges = puzzleInput.first().split(",").map { it.split("-") }
        var invalidIDs = 0L

        ranges.forEach { pair ->
            for (i in pair.first().toLong()..pair.last().toLong()) {
                val maxIterations = i.toString().length/2
                for (j in 1..maxIterations) {
                    val validatePartsOfIDs = i.toString().chunked(j)
                    val allSplittedPartsOfIDsAreEqual = validatePartsOfIDs.all{ it == validatePartsOfIDs[0] }
                    if (allSplittedPartsOfIDsAreEqual) {
                        invalidIDs += i
                        break
                    }
                }
            }
        }
        return invalidIDs.toString()
    }
}