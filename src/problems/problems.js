export const problems = [
    {
        problemName: 'Add',
        difficulty: 'easy',
        problemDescription: `given two integers, a and b, return the sum of a + b`,
        inputFormat: `a a integer, b a integer `,
        constrains: ['-Infinty > a < Infinity', '-Infinity > b < Infinity'],
        sampleCases: [
            {
                input: [9, 6],
                output: [15],
                explanation: `9  + 6 = 15`,
            },
            {
                input: [108, 12],
                output: [120],
                explanation: `108 + 12 = 120`,
            },
            {
                input: [-108, 12],
                output: [-96],
            },
        ],
        inputs: ['a', 'b'],
    },
    {
        problemName: 'Multiply',
        difficulty: 'easy',
        problemDescription: `given three number, x, y, z, return the product of x * y * z`,
        inputFormat: `x a number, y a number, z a number`,
        constrains: ['x a number', 'y a number', 'z a number'],
        sampleCases: [
            { input: [30, 2, 4], output: [240] },
            { input: [0, 0, 0], output: [0], explanation: `0 * 0 * 0 = 0` },
            { input: [3, 5, 4], output: [60] },
            { input: [3, 2.5, 2], output: [15] },
        ],
        inputs: ['x', 'y', 'z'],
    },

    {
        problemName: 'MinMax Sum',
        difficulty: 'easy',
        problemDescription: `Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.`,
        inputFormat: `A single line of five space-separated integers.`,
        // constrains: [`0 < n < 100`],
        return: `Print two space-separated integers on one line: the minimum sum and the maximum sum of  of  elements.`,
        sampleCases: [
            {
                input: [`[1, 2, 3, 4, 5]`, `[69, 69]`],
                output: [[10 + ' ' + 14]],
            },
            {
                input: [`[3, 3, 3, 3, 3]`],
                output: [[12 + ' ' + 12]],
            },
        ],
        inputs: ['arr'],
    },
    {
        problemName: 'Counting Valleys',
        difficulty: 'Hard',

        problemDescription: `
                An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly <span class="varieble">steps</span> steps, for every step it was noted if it was an uphill, <span class="varieble">U</span> , or a downhill, <span class="varieble">D</span> step. Hikes always start and end at sea level, and each step up or down represents a <span class="varieble">1</span> unit change in altitude.
              
        \n
        Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.


                 `,
        constrains: [
            ` <span class="varieble">2 < steps < 1000`,
            `<span class="varieble">path[i] = "U"</span> or <span class="varieble">path[i] = "D"</span>`,
        ],
        inputFormat: `The first line contains an integer <span class="varieble">steps</span>, the number of steps in the hike.
        The second line contains a single string  <span class="varieble">path</span>, of   <span class="varieble">steps</span>characters that describe the path.`,
        // constrains: [`0 < n < 100`],
        return: `int: the number of valleys traversed`,
        sampleCases: [
            {
                input: [8, `'UDDDUDUU'`],
                output: [1],
                explanation: {
                    text: `If we represent <span class="varieble">_</span> as sea level, a step up as <span class="varieble">/</span>, and a step down as <span class="varieble">&#92</span>, the hike can be drawn as:`,
                    explanationOutput: [' _/&#92      _', '    &#92    /', '     &#92/&#92/'],
                },
            },
            {
                input: [6, `'DUDUDU'`],
                output: [3],
            },
        ],
        inputs: ['steps', 'path'],
    },
]
