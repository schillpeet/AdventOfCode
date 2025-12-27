package aoc2025.days.day3

import aoc2025.days.DaysI

class Day3 : DaysI {
    override fun part1(puzzleInput: List<String>): String {
        var sumOfMaxJoltage = 0
        puzzleInput.forEach {
            var banks = it.chunked(1)
            var maxJoltage = 0

            while(banks.isNotEmpty()) {
                val batteryOne = banks.first()
                val batteryRest = banks.drop(1)
                for (batteryNext in batteryRest) {
                    val check = (batteryOne + batteryNext).toInt()
                    if (check > maxJoltage) maxJoltage = check
                }
                banks = banks.drop(1)
            }
            sumOfMaxJoltage += maxJoltage
        }
        return sumOfMaxJoltage.toString()
    }

    fun part2(puzzleInput: List<String>, ignoreDigits: Int): String {
        return puzzleInput.sumOf { helperFunPart2(it, ignoreDigits).joinToString("").toLong() }.toString()
    }

    fun helperFunPart2(input: String, limit: Int = 12): MutableList<Int> {
        val result = input.takeLast(limit).chunked(1).map { it.toInt() }.toMutableList()
        val rest = input.dropLast(limit).chunked(1).map { it.toInt() }.toMutableList()
        while (rest.isNotEmpty()) {
            val candidate = rest.removeAt(rest.lastIndex)
            if (candidate < result.first()) continue
            val removeCandidate = result.zipWithNext().firstOrNull { (a, b) -> a < b }?.first ?: result.lastOrNull()
            result.remove(removeCandidate)
            result.add(0, candidate)
        }
        return result
    }

    override fun part2(puzzleInput: List<String>): String {
        return part2(puzzleInput, ignoreDigits = 12)
    }
}
