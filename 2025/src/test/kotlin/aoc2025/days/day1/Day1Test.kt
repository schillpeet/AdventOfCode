package aoc2025.days.day1

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

class Day1Test: AbstractDayTest() {

    override val day = 1

    @Test
    fun `should return 3 as result`() {
        val day1part1Result = Day1().part1(inputExample())
        assertEquals("3", day1part1Result)
    }

    @Test
    fun `453 answer is too low, the result must be higher`() {
        val day1part1Result = Day1().part1(input())
        assertTrue(day1part1Result.toInt() > 453)
    }

    @Test
    fun `the answer should be 1011`() {
        val day1part1Result = Day1().part1(input())
        assertEquals("1011", day1part1Result)
    }

    @Test
    fun `should return 6 as result`() {
        val day1part2Result = Day1().part2(inputExample())
        assertEquals("6", day1part2Result)
    }

    @Test
    fun `5743 answer is too low, the result must be higher`() {
        val day1part2Result = Day1().part2(input())
        assertTrue(day1part2Result.toInt() > 5743)
    }

    @Test
    fun `6500 answer is too high, the result must be lower`() {
        val day1part2Result = Day1().part2(input())
        assertTrue(day1part2Result.toInt() < 6500)
    }

    @Test
    fun `5967 is not the right answer`() {
        val day1part2Result = Day1().part2(input())
        assertNotEquals(day1part2Result.toInt(), 5967)
    }

    @Test
    fun `the output should be 29 for my own example`() {
        val day1part2Result = Day1().part2(ownExample())
        assertEquals(day1part2Result.toInt(), 29)
    }

    // edge cases
    @Test
    fun `the dial position should exactly match 0 after a right turn` () {
        val str = listOf("R50")
        val day1 = Day1()
        val day1part2Result = day1.part2(str)
        val lastDialPosition = day1.dialPosition
        assertEquals(1, day1part2Result.toInt())
        assertEquals(0, lastDialPosition)
    }

    @Test
    fun `the dial position should exactly match 0 after a left turn` () {
        val str = listOf("L50")
        val day1 = Day1()
        val day1part2Result = day1.part2(str)
        val lastDialPosition = day1.dialPosition
        assertEquals(1, day1part2Result.toInt())
        assertEquals(0, lastDialPosition)
    }
}