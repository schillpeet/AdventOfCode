package aoc2025.days.day4

import aoc2025.days.DaysI
import aoc2025.days.DailyHelper

class Day4: DaysI {

    private fun countPaperNeighbours(neighbours: List<Char>) =
        neighbours.count { it == '@' }

    override fun part1(puzzleInput: List<String>): String {
        val grid = DailyHelper.createGrid(puzzleInput)
        var counter = 0
        grid.forEachIndexed { y, row ->
            row.forEachIndexed { x, cell ->
                if (cell == '.') return@forEachIndexed
                val neighbours = DailyHelper.getNeighbours(grid, y, x)
                if (countPaperNeighbours(neighbours) < 4) counter++
            }
        }
        return counter.toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        var grid = DailyHelper.createGrid(puzzleInput)
        var counter = 0
        while (true) {
            val paperToRemove = emptyList<Triple<Char,Int,Int>>().toMutableList()
            grid.forEachIndexed { y, row ->
                row.forEachIndexed { x, cell ->
                    if (cell == '.') return@forEachIndexed
                    val neighbours = DailyHelper.getNeighboursWithIndex(grid, y, x)
                    if (countPaperNeighbours(neighbours.map{ it.first }) < 4) {
                        counter++
                        paperToRemove += Triple(cell, y, x)
                    }
                }
            }
            val newValues = paperToRemove.map { (_, y, x) -> Triple('.', y, x) }
            grid = DailyHelper.updateGrid(grid, newValues)

            if (paperToRemove.isEmpty()) break
        }
        return counter.toString()
    }
}























