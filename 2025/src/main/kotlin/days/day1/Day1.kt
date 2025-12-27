package aoc2025.days.day1

import aoc2025.days.DaysI
import kotlin.math.abs

class Day1: DaysI {

    override fun part1(puzzleInput: List<String>): String {
        var dialPosition = 50
        var countZeros = 0
        puzzleInput.forEach {
            val (rotation, number) = it.first() to it.drop(1).toInt()
            when (rotation) {
                'L' -> dialPosition -= number
                'R' -> dialPosition += number
            }
            while (dialPosition < 0) dialPosition += 100
            while (dialPosition > 99) dialPosition -= 100
            if (dialPosition == 0) countZeros += 1
        }
        return countZeros.toString()
    }

    var dialPosition = 50

    fun calc(numberOfRotation: Int, str: String): Int {
        var crossZeroRotations = abs(numberOfRotation / 100)

        val newPosition = dialPosition + numberOfRotation % 100

        if (newPosition < 0) {
            if (dialPosition != 0) crossZeroRotations += 1
            dialPosition = newPosition + 100
        } else if (newPosition > 99) {
            if (dialPosition != 0) crossZeroRotations += 1
            dialPosition = newPosition - 100
        } else if (newPosition == 0) {
            crossZeroRotations += 1
            dialPosition = 0
        } else {
            dialPosition = newPosition
        }

        return crossZeroRotations
    }

    override fun part2(puzzleInput: List<String>): String {
        var countZeros = 0
        puzzleInput.forEach {
            val (rotation, number) = it.first() to it.drop(1).toInt()
            when (rotation) {
                'L' -> countZeros += calc(number * -1, it)
                'R' -> countZeros += calc(number, it)
            }
        }
        return countZeros.toString()
    }
}