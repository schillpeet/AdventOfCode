package aoc2025.days.day8

import aoc2025.days.DaysI
import java.util.PriorityQueue
import kotlin.math.pow
import kotlin.math.sqrt

data class Node(
    val point: Point,
    val axis: Int,
    var parent: Node? = null,
    var left: Node? = null,
    var right: Node? = null,
)

data class DistancePoints(
    val distance: Double,
    val point1: Point,
    val point2: Point,
    val idx: Long? = null
)

data class Point(val x: Double, val y: Double, val z: Double, val idx: Int)

class Day8: DaysI {

    private lateinit var kdTree: Node

    private fun Point.coordinate(axis: Int): Double =
        when (axis) {
            0 -> this.x
            1 -> this.y
            else -> this.z
        }

    // https://www.baeldung.com/cs/k-d-trees
    private fun createKdTree(points:List<Point>, depth: Int, parent: Node?): Node? {
        if (points.isEmpty()) return null

        val axis = depth % 3 // determines the current level (i.e., the axis)

        val sortedPoints = points.sortedBy { it.coordinate(axis) }
        val medianIndex = points.size / 2
        val axisMedian = sortedPoints[medianIndex]

        val leftPoints = sortedPoints.subList(0, medianIndex)
        val rightPoints = sortedPoints.subList(medianIndex+1, sortedPoints.size)

        val node = Node(point = axisMedian, axis = axis)
        node.left = createKdTree(leftPoints, depth + 1, node)
        node.right = createKdTree(rightPoints, depth + 1, node)

        return node
    }

    fun printKDTreeLevels(root: Node?) {
        if (root == null) return

        val queue = ArrayDeque<Pair<Node, Int>>() // Node + Depth
        queue.add(root to 0)

        var currentLevel = 0
        print("Level 0: ")

        while (queue.isNotEmpty()) {
            val (node, depth) = queue.removeFirst()

            if (depth != currentLevel) {
                println() // new level
                print("Level $depth: ")
                currentLevel = depth
            }

            print("(${node.point.x},${node.point.y},${node.point.z}) ")

            node.left?.let { queue.add(it to depth + 1) }
            node.right?.let { queue.add(it to depth + 1) }
        }
        println()
    }


    val maxHeap = PriorityQueue<DistancePoints>(compareByDescending { it.distance })

    // Descent
    private fun goToLeaf(point: Point, node: Node): Node {
        if (point.coordinate(node.axis) <= node.point.coordinate(node.axis) && node.left != null)
            return goToLeaf(point, node.left!!)
        if (point.coordinate(node.axis) > node.point.coordinate(node.axis) && node.right != null)
            return goToLeaf(point, node.right!!)
        return node
    }

    private fun Point.distanceOfTwoPoints(point: Point): Double =
        sqrt((point.x - this.x).pow(2) + (point.y - this.y).pow(2) + (point.z - this.z).pow(2))


    private fun backTracking(pointToCheck: Point, node: Node?, freePoints: Int) {
        if (node?.parent == null) return // finished -> really?

        val freePointsInMaxHeap = freePoints - maxHeap.size
        val distance = pointToCheck.distanceOfTwoPoints(node.point)

        // Special case: if we haven't found the 1000 smallest connections yet
        // in this case we can fill everything for now
        if (freePointsInMaxHeap > 0) {
            maxHeap.add(DistancePoints(distance, pointToCheck, node.point))
            backTracking(pointToCheck, node.parent, freePoints - 1)
        }

        // Normal case
        // we call backTracking initially with the leaf, so we perform various checks:
        // 1. is the distance of the current node smaller than the top of the max heap?
        // if yes, remove the top of the max heap and add the new point
        else if (distance < maxHeap.peek().distance) {
            maxHeap.poll()
            maxHeap.add(DistancePoints(distance, pointToCheck, node.point))
            backTracking(pointToCheck, node.parent, freePoints - 1) // is freePoints - 1 really needed?
        }

        // we still need the case whether we should examine the sibling node
        // we always need to check this, regardless of whether freePoints has been reached or not


//        else if (distance < maxHeap.peek().first && pointToCheck.idx < leaf.first.point.idx)
//            maxHeap.add(Triple(distance, pointToCheck, leaf.first.point))
    }

    /**
     * First, I implemented a kdtree, went down to the last leaf, and then used backtracking
     * to check if the next branch was a potential candidate.
     * Kdtree is a good algorithm for d-dimensions, but it's total overkill for this problem.
     * So I simply chose a naive implementation. This probably runs with log(n).
     */
    private fun naivImplementation(points: List<Point>, limit: Int) {
        var idx = 1
        var idxPart2 = 0L
        for (point in points) {
            for (pIdx in idx until points.size) {
                idxPart2++
                val distance = point.distanceOfTwoPoints(points[pIdx])
                val distObj = DistancePoints(distance, point, points[pIdx], idxPart2)
                if (maxHeap.size < limit) maxHeap.add(distObj)
                else if (distance < maxHeap.peek().distance) {
                    maxHeap.poll()
                    maxHeap.add(distObj)
                }
            }
            idx++
        }
    }

    /**
     * todo
     *  here you only initialize the heap, but not the circles
     *  you have another function for that, you need to look at it
     */
    private var lastTwoAddedPoints = mutableListOf<Point>()
    private fun naivImplementation2(points: List<Point>, limit: Int) {
        var idx = 1
        for (point in points) {
            for (pIdx in idx until points.size) {
                val distance = point.distanceOfTwoPoints(points[pIdx])
                val distObj = DistancePoints(distance, point, points[pIdx])
                if (maxHeap.size < limit) {
                    maxHeap.add(distObj)
                    lastTwoAddedPoints.add(points[pIdx])
                }
                else if (distance < maxHeap.peek().distance) {
                    maxHeap.poll()
                    maxHeap.add(distObj)
                    lastTwoAddedPoints.add(points[pIdx])
                }
            }
            idx++
        }
        // expected: (216 and 117)
        println("Max-Heap Size: ${maxHeap.size}")
        maxHeap.forEach { println("x1: ${it.point1.x},  x2: ${it.point2.x}") }
        println("Mutable-List Size: ${lastTwoAddedPoints.size}")
        lastTwoAddedPoints.forEach { println("point x: ${it.x}") }
    }

    /**
     * todo
     *  here you must find the last two elements
     */
    private fun collectCircles(): MutableList<MutableSet<Int>> {
        val pointsIndices: List<List<Int>> = maxHeap.map { listOf(it.point1.idx, it.point2.idx) }
        // DistancePoints(distance=458.360120429341, point1=Point(x=216.0, y=146.0, z=977.0, idx=10), point2=Point(x=117.0, y=168.0, z=530.0, idx=12), idx=147)
        /**
         * todo
         *  here you are just looking for the largest distance that should no longer be added
         */
        println(maxHeap.find { it.point1.x == 216.toDouble() })
        //println(maxHeap.maxByOrNull { it.distance }!!.distance)
        maxHeap.sortedBy { it.distance }.forEachIndexed { index, points -> println("$index: ${points.distance} point1.x= ${points.point1.x} point2.x= ${points.point2.x} ") }
        val circles = mutableListOf<MutableSet<Int>>()
        var counter = 0
        for (ls in pointsIndices) {
            val circle = circles.filter { c -> c.intersect(ls.toSet()).isNotEmpty() }
            if (circle.isEmpty()) circles.add(ls.toMutableSet()) // create new circle
            else {
                val firstCircle = circle.first()
                firstCircle.addAll(ls)
                if (circle.size > 1) {
                    for (i in 1 until circle.size) {
                        firstCircle.addAll(circle[i])
                        circles.remove(circle[i])
                    }
                }
            }
            if (circles.size == 2) {
                println("ls: $ls with circles: ${circles}")
            }
        }
        println("circles.size: {${circles.size}}\ncounter: {${counter}}")
        return circles
    }

    private fun initPoints(input: List<String>) = input.mapIndexed { index, line ->
        val parts = line.split(",").map(String::toDouble)
        Point(parts[0], parts[1], parts[2], index)
    }

    fun part1(puzzleInput: List<String>, searchedConnections: Int = 1000): String {
        val points = initPoints(puzzleInput)
        naivImplementation(points, searchedConnections)
        return collectCircles().map { it.size }.sortedDescending().take(3)
            .fold(1) { a, b -> a * b }.toString()
    }

    override fun part1(puzzleInput: List<String>): String {
        return part1(puzzleInput, 1000)
    }

    fun part2(puzzleInput: List<String>, searchedConnections: Int): String {
        val points = initPoints(puzzleInput)
        naivImplementation(points, searchedConnections)
        val c = collectCircles()

        // expected: (216 and 117)

        return ""
    }

    override fun part2(puzzleInput: List<String>): String {
        return part2(puzzleInput, 1000-1)
    }
}
