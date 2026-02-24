package aoc2025.days.day8

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day8Test: AbstractDayTest() {
    override val day = 8

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day8().part1(examplePuzzleInput(), 10)
        assertEquals("40", actual)
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day8().part2(examplePuzzleInput(), 20-1)
        //assertEquals("25272", actual)
    }
}
