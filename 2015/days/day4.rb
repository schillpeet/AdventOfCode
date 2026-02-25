require 'digest'

input = "bgvyzdsv"
input_test_1 = "abcdef"


count = 0
loop do
  result = Digest::MD5.hexdigest("#{input}#{count}")
  break if result.start_with?("00000")
  count += 1
end

puts "day1, part1: #{count}" #     #{part1(input)}"