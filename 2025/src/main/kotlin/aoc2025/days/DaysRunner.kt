package aoc2025.days

import aoc2025.days.day1.Day1
import aoc2025.days.day2.Day2
import aoc2025.days.day3.Day3
import java.io.File

object DaysRunner {
    const val GREEN = "\u001B[32m"
    const val RESET = "\u001B[0m"

    private fun readInput(day: Int): List<String> {
        return File("src/main/kotlin/days/day$day/puzzle").readLines()
    }

    private fun getDay(day: Int): DaysI {
        val day = when (day) {
            1 -> Day1()
            2 -> Day2()
            3 -> Day3()
            else -> error("Day $day not implemented")
        }
        return day
    }

    fun run(day: Int, part: Int) {
        val puzzleInput = readInput(day)
        val dayX = getDay(day)
        val result = when (part) {
            1 -> dayX.part1(puzzleInput)
            2 -> dayX.part2(puzzleInput)
            else -> error("Part $part not implemented")
        }
        println("${GREEN}Day $day Part $part: $result${RESET}")
    }


}