package aoc2025.days.day5

import aoc2025.days.DailyHelper
import aoc2025.days.DaysI

class Day5: DaysI {

    private fun freshRangesAndIngredients(puzzleInput: List<String>) =
        puzzleInput.let { ls ->
            val splitIdx = ls.indexOfFirst(String::isBlank)
            ls.take(splitIdx).map { r ->
                r.split('-').map(String::toLong).let { it.first()..it.last() }
            } to
                    ls.drop(splitIdx + 1).map(String::toLong)
        }

    override fun part1(puzzleInput: List<String>): String {
        val (freshRanges, ingredients) = freshRangesAndIngredients(puzzleInput)
        return ingredients.count { ing ->
            freshRanges.any { ing in it }
        }.toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        val (freshRanges, _) = freshRangesAndIngredients(puzzleInput)
        val mergedRanges: List<LongRange> = DailyHelper.mergeRanges(freshRanges)
        return mergedRanges.sumOf {
            it.last - it.first+1
        }.toString()
    }
}


