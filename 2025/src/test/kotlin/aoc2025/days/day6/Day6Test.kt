package aoc2025.days.day6

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day6Test: AbstractDayTest() {
    override val day = 6

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day6().part1(examplePuzzleInput())
        assertEquals("4277556", actual)
    }

    // -- wrong answer --
    @Test
    fun `the answer is too low` () {
        val actual = Day6().part1(puzzleInput())
        assertTrue(1615951811 < actual.toLong())
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day6().part2(examplePuzzleInput())
        assertEquals("3263827", actual)
    }

    @Test
    fun `part2 final solution` () {
        val actual = Day6().part2(puzzleInput())
        assertEquals("11744693538946",actual)
    }
}
