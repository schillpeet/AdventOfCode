package aoc2025.days.day2

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day2Test: AbstractDayTest() {

    override val day = 2

    @Test
    fun `should validate the example result of part1` () {
        val exampleResult = 1227775554
        val day2part1Result = Day2().part1(examplePuzzleInput())
        assertEquals(exampleResult.toString(), day2part1Result)
    }

    @Test
    fun `should validate the example result of part2` () {
        val exampleResult = 4174379265
        val day2part2Result = Day2().part2(examplePuzzleInput())
        assertEquals(exampleResult.toString(), day2part2Result)
    }
}