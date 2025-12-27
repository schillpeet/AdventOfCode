package aoc2025.days.day4

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day4Test: AbstractDayTest() {
    override val day = 4

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day4().part1(inputExample())
        assertEquals("13", actual)
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day4().part2(inputExample())
        assertEquals("43", actual)
    }
}
