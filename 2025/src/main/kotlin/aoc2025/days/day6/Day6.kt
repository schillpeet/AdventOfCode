package aoc2025.days.day6

import aoc2025.days.DaysI


class Day6: DaysI {
    override fun part1(puzzleInput: List<String>): String {
        val (operations, numbers) = puzzleInput
            .map { line -> line.split(' ').filter { value -> value.isNotBlank() } }
            .reversed()
            .let { it.first() to it.drop(1).map{ j -> j.map(String::toLong)} }
        val sortedNumbers = (0 until numbers[0].size).map { idx -> numbers.map { el -> el[idx] } }

        return operations.withIndex().sumOf { (idx, value) ->
            when (value) {
                "+" -> sortedNumbers[idx].sumOf { it }
                "*" -> sortedNumbers[idx].reduce { acc, value -> acc * value }
                else -> error("This shouldn't happen")
            }
        }.toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        TODO("Not yet implemented")
    }
}
