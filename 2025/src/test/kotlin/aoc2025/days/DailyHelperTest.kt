package aoc2025.days

import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class DailyHelperTest {

    @Test
    fun `should return all eight neighbours of candidate` () {
        val input: List<CharArray> = listOf(
            charArrayOf('.', 'x', '.'),
            charArrayOf('.', 'O', '.'),
            charArrayOf('.', 'x', '.')
        )
        val actual = DailyHelper
            .getNeighbours(input, 1, 1)
            .count()
        assertEquals(8, actual)
    }

    @Test
    fun `should update old grid` () {
        val oldGrid: List<CharArray> = listOf(
            charArrayOf('.', 'x', '.'),
            charArrayOf('.', 'O', '.'),
            charArrayOf('.', 'x', '.')
        )
        val newValues = listOf(Triple('!', 1, 0), Triple('!', 1, 2))
        val expected: List<CharArray> = listOf(
            charArrayOf('.', 'x', '.'),
            charArrayOf('!', 'O', '!'),
            charArrayOf('.', 'x', '.')
        )
        DailyHelper.updateGrid(oldGrid, newValues)
        assertTrue(oldGrid.indices.all { row -> oldGrid[row].contentEquals(expected[row]) })
    }

    @Test
    fun `should merge list of ranges` () {
        val ranges = listOf(
            1L..20,
            22L..30,
            23L..28,
            32L..40,
            41L..50,
            50L..60
        )
        val actual = DailyHelper.mergeRanges(ranges)
        val expected = listOf(1L..20, 22L..30, 32L..60)
        assertEquals(expected, actual)
    }
}
