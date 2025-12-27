#!/usr/bin/env bash
set -e

day=$1

if ! [[ $day =~ ^([1-9]|1[0-2])$ ]]; then
    echo "No guilty day"
    exit 1
fi


ROOT_DIR=$(pwd)

# Main source
SRC_DIR="$ROOT_DIR/src/main/kotlin/aoc2025/days/day$day"
mkdir -p "$SRC_DIR"
MAIN_FILE="$SRC_DIR/Day$day.kt"

if [ ! -f "$MAIN_FILE" ]; then
cat <<EOF > "$MAIN_FILE"
package aoc2025.days.day$day

import aoc2025.days.DaysI

class Day$day: DaysI {
}
EOF
fi

PUZZLE_FILE="$SRC_DIR/puzzle"
if [ ! -f "$PUZZLE_FILE" ]; then
    touch "$PUZZLE_FILE"
fi

# Test source
TEST_DIR="$ROOT_DIR/src/test/kotlin/aoc2025/days/day$day"
mkdir -p "$TEST_DIR"
TEST_FILE="$TEST_DIR/Day${day}Test.kt"

if [ ! -f "$TEST_FILE" ]; then
cat <<EOF > "$TEST_FILE"
package aoc2025.days.day$day

import aoc2025.days.AbstractDayTest
import org.junit.jupiter.api.Test

class Day${day}Test: AbstractDayTest() {
    override val day = $day

    // --- part 1 ---
    @Test
    fun `part 1 should return correct example result`() {
        val actual = Day$day().part1(inputExample())

    }

    // --- part 2 ---
    @Test
    fun `part 2 should return correct example result`() {
        val actual = Day$day().part2(inputExample())

    }
}
EOF
fi

PUZZLE_EXAMPLE="$TEST_DIR/puzzleExample"
if [ ! -f "$PUZZLE_EXAMPLE" ]; then
    touch "$PUZZLE_EXAMPLE"
fi

echo "Initialized Day $day"
