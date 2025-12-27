package aoc2025.days

import java.io.File

abstract class AbstractDayTest {

    abstract val day: Int

    protected fun input(): List<String> =
        File("src/main/kotlin/aoc2025/days/day$day/puzzle").useLines { it.toList() }

    protected fun inputExample(): List<String> =
        File("src/test/kotlin/aoc2025/days/day$day/puzzleExample").useLines { it.toList() }

    protected fun ownExample(): List<String> =
        File("src/test/kotlin/aoc2025/days/day$day/ownExample").useLines { it.toList() }
}