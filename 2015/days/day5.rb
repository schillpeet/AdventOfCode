input = File.read("puzzles/day5.txt")

def part1(input)
  disallowed = Regexp.union([/ab/, /cd/, /pq/, /xy/])
  vowels = Regexp.union([/a/, /e/, /i/, /o/, /u/])
  doubleLetters = Regexp.union(/([a-z])\1/)

  nice = 0
  input.each_line do |l|
    disallowedSubstrings = l.scan(disallowed).empty?
    threeTimesVowels = l.scan(vowels).length >= 3
    twiceInARaw = !l.scan(doubleLetters).empty?
    if disallowedSubstrings && threeTimesVowels && twiceInARaw
      nice += 1
    end
  end
  return nice
end

puts "day5, part1: #{part1(input)}"


def part2(input)
  sandwich = Regexp.union(/([a-z]).\1/)
  pairs = Regexp.union(/([a-z]{2}).*\1/)
  nice = 0
  input.each_line do |l|
    foundSandwich = l.match?(sandwich)
    foundPair = l.match?(pairs)
    if foundSandwich && foundPair
      nice += 1
    end
  end
  return nice
end

puts "day5, part2: #{part2(input)}"

