input = File.read("day1") # read opens and closes file
#input = "(())"

result = input.each_char.sum { |c| c == '(' ? 1 : -1}
print result
