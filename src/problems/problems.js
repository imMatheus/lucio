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
        problemName: 'Counting Valley',
        difficulty: 'hard',
        problemDescription: `Alice and Bob each created one problem for HackerRank. A reviewer rates the two challenges, awarding points on a scale from 1 to 100 for b[1], b[2])`,
        inputFormat: `The first line contains number of testcases T. The2*Tsubsequent lines each describe a test case over2lines: The first contains 3space-separated integers, N , A, and B, respectively. The second contains S (the string Greg wishes to build).`,
        constrains: ['T is a string', 'W is a integer'],
        sampleCases: [
            { input: [9, 'lucioo'], output: [34, 2], explanation: 'he can cuz he cool ngl' },
            { input: ['uga'], output: [4, 52], explanation: 'he can cuz he cool ngl' },
        ],
        inputs: ['arr', 'x'],
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
                input: [[1, 2, 3, 4, 5]],
                output: [[10 + ' ' + 14]],
            },
            {
                input: [[3, 3, 3, 3, 3]],
                output: [[15 + ' ' + 15]],
            },
        ],
        inputs: ['arr'],
    },
]
