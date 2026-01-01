package aoc2025.days.day7

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day7Test: AbstractDayTest() {
    override val day = 7

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day7().part1(examplePuzzleInput())
        assertEquals("21", actual)
    }

    @Test
    fun `the answer of part1 is too low and have to be bigger` () {
        val actual = Day7().part1(puzzleInput())
        assertTrue(952 < actual.toInt())
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day7().part2(examplePuzzleInput())
        assertEquals("40", actual)
    }

    @Test
    fun `the answer of part2 is too low and have to be bigger` () {
        val actual = Day7().part2(puzzleInput())
        assertTrue(738038650 < actual.toLong())
    }

    @Test
    fun `no splitter works`() {
        val input = """
            ..S..
            .....
            ..^..
            .....
            .^.^.
            .....
            ^.^.^
            .....
            .^.^.
            .....
        """.trimIndent().lines()
        val actual = Day7().part2(input)
        assertEquals("12", actual)
    }
}
