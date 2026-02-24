input = File.read("puzzles/day2.txt")

def part1(input)
  input.each_line.sum do |line|
    a, b, c = line.split("x").map(&:to_i) # destructuring + map to int
    area = 2*a*b + 2*b*c + 2*c*a
    sides = [a*b, b*c, c*a].min
    area + sides
  end
end

puts "day2, part1: #{part1(input)}"