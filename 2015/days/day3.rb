input = File.read("puzzles/day3.txt")

def part1(input)
  x, y = 0, 0
  visited = [[0,0]]

  moves = {
    "^" => [1, 0],
    "v" => [-1, 0],
    ">" => [0, 1],
    "<" => [0, -1]
  }
  
  input.each_char do |c|
    dx, dy = moves[c]
    x += dx
    y += dy
    visited << [x,y]
  end

  visited.uniq.size
end

puts "day3, part1: #{part1(input)}"