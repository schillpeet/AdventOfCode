input = File.read("puzzles/day1.txt") # read opens and closes file

# @param input [String]
def part1(input)
  input.each_char.sum { |c| c == '(' ? 1 : -1}
end

puts "day1, part1: #{part1(input)}"

# @param input [String]
def part2(input)
  sum = 0
  input.each_char.with_index(1) do  |c,i| 
    sum += c == '(' ? 1 : -1
    return i if sum == -1
  end
end

puts "day1, part2: #{part2(input)}"