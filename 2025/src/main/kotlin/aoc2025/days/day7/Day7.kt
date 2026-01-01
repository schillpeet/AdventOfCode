package aoc2025.days.day7

import aoc2025.days.DaysI

class Day7: DaysI {

    override fun part1(puzzleInput: List<String>): String {
        var beams = listOf(puzzleInput.first().indexOf('S'))
        var counter = 0
        puzzleInput.drop(1).forEach { line ->
            val splitter = line.indices.filter { el -> line[el] == '^' }
            val newBeams = emptyList<Int>().toMutableList()

            beams.forEach { beam ->
                // case 1: beam & splitter have the same idx
                if (splitter.contains(beam)) {
                    var fine = false
                    if (beam - 1 != -1) {
                        newBeams.add(beam - 1)
                        fine = true
                    }
                    if (beam + 1 != line.length) {
                        newBeams.add(beam + 1)
                        fine = true
                    }
                    if (fine) counter++
                }
                else newBeams.add(beam) // case 2: the beam passes through
            }
            beams = newBeams.distinct().ifEmpty { beams }
        }
        return counter.toString()
    }

    override fun part2(puzzleInput: List<String>): String {
        var beams: List<Pair<Int, Long>> = listOf(Pair(puzzleInput.first().indexOf('S'), 1L))
        puzzleInput.drop(1).forEach { line ->
            val splitter = line.indices.filter { el -> line[el] == '^' }
            val newBeams = emptyList<Pair<Int,Long>>().toMutableList()

            beams.forEach { beam ->
                // case 1: beam & splitter have the same idx
                if (splitter.contains(beam.first)) {
                    if (beam.first - 1 != -1)
                        newBeams.add(Pair(beam.first - 1, beam.second))
                    if (beam.first + 1 != line.length)
                        newBeams.add(Pair(beam.first + 1, beam.second))
                }
                else newBeams.add(beam) // case 2: the beam passes through
            }
            beams = newBeams
                .ifEmpty { beams }
                .groupBy { it.first }
                .map { (key, value) -> key to value.sumOf { it.second } }
        }
        return beams.sumOf { it.second }.toString()
    }
}
