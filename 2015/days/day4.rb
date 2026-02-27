require 'digest'

def part1and2(input, difficulty)
  count = 0
  prefix = difficulty == 1 ? "00000" : "000000"
  loop do
    result = Digest::MD5.hexdigest("#{input}#{count}")
    return count if result.start_with?(prefix)
    count += 1
  end
  count
end

input = "bgvyzdsv"

puts "day1, part1: #{part1and2(input, 1)}"
puts "day1, part2: #{part1and2(input, 2)}"