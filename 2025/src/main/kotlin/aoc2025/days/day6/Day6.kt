package aoc2025.days.day6

import aoc2025.days.DaysI


class Day6: DaysI {
    private fun List<String>.calculateOperations(numbers: List<List<Long>>): Long {
        return this.withIndex().sumOf { (idx, operation) ->
            when (operation) {
                "+" -> numbers[idx].sumOf { it }
                "*" -> numbers[idx].reduce { acc, value -> acc * value }
                else -> error("Invalid operation: $operation")
            }
        }
    }

    override fun part1(puzzleInput: List<String>): String {
        val (operations, numbers) = puzzleInput
            .map { line -> line.split(' ').filter { value -> value.isNotBlank() } }
            .reversed()
            .let { it.first() to it.drop(1).map{ j -> j.map(String::toLong)} }
        val sortedNumbers = (0 until numbers[0].size).map { idx -> numbers.map { el -> el[idx] } }

        return operations.calculateOperations(sortedNumbers).toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        val operations = puzzleInput.last().split(Regex("\\s+")).filter{ it != "" }
        val numbers = puzzleInput.dropLast(1)
        val numOfLines = numbers.size

        val numbersOrdered = numbers[0].indices.map { idx ->
            (0 until numOfLines).mapIndexed { index, _ -> numbers[index][idx] }
        }
            .map { el -> el.joinToString("").trim() }
            .map {c -> if(c.isBlank()) null else c.toLong() }
            .fold(mutableListOf(mutableListOf<Long>())) { acc, next ->
                if (next == null) acc.add(mutableListOf())
                else acc.last().add(next)
                acc
            }

        return operations.calculateOperations(numbersOrdered).toString()
    }
}
