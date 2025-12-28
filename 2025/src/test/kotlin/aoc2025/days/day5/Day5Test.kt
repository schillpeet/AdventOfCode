package aoc2025.days.day5

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day5Test: AbstractDayTest() {
    override val day = 5

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day5().part1(inputExample())
        assertEquals("3", actual)
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day5().part2(inputExample())
        assertEquals("14", actual)
    }
}
