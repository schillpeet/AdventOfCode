package aoc2025.days

object DailyHelper {
    private val nx = listOf(-1, 0, 1, -1, 1, -1, 0, 1)
    private val ny = listOf(-1, -1, -1, 0, 0, 1, 1, 1)

    fun createGrid(input: List<String>): List<CharArray> = input.map(String::toCharArray)

    fun updateGrid(grid: List<CharArray>, newValues: List<Triple<Char, Int, Int>>): List<CharArray> {
        newValues.forEach { (value, y, x) ->
            grid[y][x] = value
        }
        return grid
    }

    fun getNeighbours(grid: List<CharArray>, y: Int, x: Int): List<Char> {
        return (0 until 8).mapNotNull {
            grid.getOrNull(y + ny[it])?.getOrNull(x + nx[it])
        }
    }

    fun getNeighboursWithIndex(grid: List<CharArray>, y: Int, x: Int): List<Triple<Char, Int, Int>> {
        return (0 until 8).mapNotNull { it ->
            val yPos = y + ny[it]
            val xPos = x + nx[it]
            grid.getOrNull(yPos)?.getOrNull(xPos)?.let {
                Triple(it, yPos, xPos)
            }
        }
    }

    fun mergeRanges(ls: List<LongRange>): List<LongRange> {
        val (firstEl, restList) = ls.sortedBy { it.first }.let { it.first() to it.drop(1) }
        val result: MutableList<LongRange> = mutableListOf(firstEl)
        restList.forEach { el ->
            if (result.last().last < el.first - 1) result.add(el) // 1. add new range
            else if (result.last().last < el.last)
                result[result.lastIndex] = result.last().first .. el.last // 2. extend range
        }
        return result
    }
}
