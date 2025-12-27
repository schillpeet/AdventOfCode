package aoc2025

import aoc2025.days.DaysRunner

fun main(args: Array<String>) {
    val day = args.getOrNull(0)?.toIntOrNull() ?: 3
    val part = args.getOrNull(1)?.toIntOrNull() ?: 2
    DaysRunner.run(day, part)
}