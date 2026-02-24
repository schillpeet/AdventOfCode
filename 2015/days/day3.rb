input = File.read("puzzles/day3.txt")

MOVES = {
    "^" => [1, 0],
    "v" => [-1, 0],
    ">" => [0, 1],
    "<" => [0, -1]
  }

def part1(input)
  x, y = 0, 0
  visited = [[0,0]]
  
  input.each_char do |c|
    dx, dy = MOVES[c]
    x += dx
    y += dy
    visited << [x,y]
  end

  visited.uniq.size
end

puts "day3, part1: #{part1(input)}"

def part2(input)
  santa = [0,0]
  robot = [0,0]
  visited = [[0,0]]
  
  input.each_char.with_index do |c,i|
    dx, dy = MOVES[c]

    active_mover = i.even? ? santa : robot
    
    active_mover[0] += dx
    active_mover[1] += dy

    visited << active_mover.dup
  end

  visited.uniq.size
end

puts "day3, part2: #{part2(input)}"