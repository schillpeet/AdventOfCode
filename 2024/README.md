# Advent of Code 2024

Install the project: `$ npm i`

## Run a day

### Usage:

Easily execute and test different days of the challenge using the `main.js` script.

```bash
$ node main.js <day> [options]
```

#### Arguments:

- `<day>` (required):<br>
  Must be a value between `day1` and `day24`.

#### Options:

- `[-e]` (optional): <br>
  Loads the example file; without this option the puzzle is loaded directly.
- `[-f]` (optional):<br>
  Loads the final solution (part2); otherwise solution 1 is printed.
- `[-ef]` or `[-fe]` (optional):<br>
  Use both options to load the example file and output the final solution.

#### Examples:

- Runs with the puzzle input for day 1:<br>`$ node main.js day1`

- Runs with the example input for day 2:<br>`$ node main.js day2 -e`
- Outputs the final solution for day 3:<br>`$ node main.js day3 -f`

- Runs with the example input and outputs the final solution for day 5:<br>`$ node main.js day5 -ef`

## Testing

Run tests with vitest (if they exists): `$ npm run test`
