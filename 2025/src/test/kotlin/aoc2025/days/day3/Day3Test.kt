package aoc2025.days.day3

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class Day3Test() : AbstractDayTest() {

    override val day: Int = 3

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day3().part1(inputExample())
        assertEquals("357", actual)
    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day3().part2(inputExample())
        assertEquals("3121910778619", actual)
    }

    @Test
    fun `part 2 should return only n nines when input is repetitive`() {
        val actual = Day3().part2(listOf("9111919119"), 4)
        assertEquals("9999", actual)
    }

    @Test
    fun `part 2 should truncate input to specified length of 9 digits`() {
        val actual = Day3().part2(listOf("987654321111111"), 9)
        assertEquals("987654321", actual)
    }

    @Test
    fun `part 2 should use default length when no limit is provided`() {
        val actual = Day3().part2(listOf("987654321111111"))
        assertEquals("987654321111", actual)
    }

    // --- wrong answers tests
    @Test
    fun `part 2 the answer must be higher`() {
        val actual = Day3().part2(input()).toLong()
        assertTrue(actual > 173350277113674)
    }

    // --- helper function test ---
    @Test
    fun `helperFunPart2 should keep the highest leading digit`() {
        val expected = listOf(9, 2, 5, 4)
        val actual = Day3().helperFunPart2("319254", 4)
        assertEquals(expected, actual)
    }

    @Test
    fun `helperFunPart2 should remove digits only from the middle`() {
        val expected = listOf(8, 1, 5)
        val actual = Day3().helperFunPart2("811115", 3)
        assertEquals(expected, actual)
    }

    @Test
    fun `helperFunPart2 should preserve the last digit regardless of middle removals`() {
        val expected = listOf(8, 1, 1, 9)
        val actual = Day3().helperFunPart2("8111119", 4)
        assertEquals(expected, actual)
    }

    // -- edge case part2
    @Test
    fun `helperFunPart2 - edge case 1 - Several consecutive withdrawals are necessary`() {
        val expected = "78321"
        val ownInput = listOf("765028321")
        val actual = Day3().part2(ownInput, 5)
        assertEquals(expected, actual)
    }
}