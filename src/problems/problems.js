export const problems = [
    {
        problemName: 'Simple addition',
        difficulty: 'easy',
        problemDescription: `given two integers, a and b, return the sum of a + b`,
        inputFormat: `a a integer, b a integer `,
        constrains: ['-Infinty > a < Infinity', '-Infinity > b < Infinity'],
        sampleCases: [
            {
                input: [9, 6],
                output: [15],
                explanation: { text: `9 + 6 = 15` },
            },
            {
                input: [108, 12],
                output: [120],
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
            { input: [0, 0, 0], output: [0], explanation: { text: `0 * 0 * 0 = 0` } },
            { input: [3, 5, 4], output: [60] },
        ],
        inputs: ['x', 'y', 'z'],
    },
    {
        problemName: 'Number of letters',
        difficulty: 'easy',
        problemDescription: `given a string, <span class="varieble">S</span>, and a single letter, <span class="varieble">Letter</span>, return the number of instances that the letter <span class="varieble">Letter</span> appears in the string <span class="varieble">S</span>`,
        inputFormat: `<span class="varieble">S</span> a string containing lowecase letters, <span class="varieble">Letter</span> a single lowercase letter`,
        constrains: [
            `0 &#8804 <span class="varieble">S</span> &#x3c 100000  `,
            `<span class="varieble">S[i]</span> &#x2208 <span class="varieble">a-z</span>`,
            `<span class="varieble">Letter</span> &#x2208 <span class="varieble">a-z</span>`,
        ],
        sampleCases: [
            {
                input: [`'l'`, `'helloworld'`],
                output: [3],
                explanation: {
                    text: `In the string <span class="varieble">'helloworld'</span> the letter <span class="varieble">l</span> appears 3 times`,
                },
            },
            {
                input: [`'b'`, `'uraqt'`],
                output: [0],
                explanation: {
                    text: `In the string <span class="varieble">'uraqt'</span> the letter <span class="varieble">b</span> doesn't appears, so we return 0`,
                },
            },
        ],
        inputs: ['letter', 's'],
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
        difficulty: 'hard',

        problemDescription: `
                An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly <span class="varieble">steps</span> steps, for every step it was noted if it was an uphill, <span class="varieble">U</span> , or a downhill, <span class="varieble">D</span> step. Hikes always start and end at sea level, and each step up or down represents a <span class="varieble">1</span> unit change in altitude.
              
        <div class="bulletpoint">A level.</div>
        <div class="bulletpoint">A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level.</div>
        Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.


                 `,
        constrains: [
            ` <span class="varieble">2 < steps < 1000</span>`,
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
    {
        problemName: 'Almost Sorted',
        difficulty: 'medium',

        problemDescription: `
        Given an array of integers, determine whether the array
        can be sorted in ascending order using only one of the following 
        operations one time.
        <div class="bulletpoint">Swap two elements.</div>
        <div class="bulletpoint">Reverse one sub-segment.</div>
        Determine whether one, both or neither of the operations will complete the task. Output is as follows.
        <div class="bulletpoint">If the array is already sorted, output yes on the first line. You do not need to output anything else.</div>
        <div class="bulletpoint">
            If you can sort this array using one single operation (from the two permitted operations) then output yes on the first line and then:
            <ul class="numberlist">
                <li>
                If elements can only be swapped, <span class="varieble">d[l]</span> and <span class="varieble">d[r]</span>,
                output swap l r in the second line.  
                <span class="varieble">l</span> and <span class="varieble">r</span> are the indices of the elements to be swapped, 
                assuming that the array is indexed from <span class="varieble">1</span> to <span class="varieble">n</span>.
                </li>
                <li>
                If elements can only be reversed, for the segment <span class="varieble">d[l...r]</span>, output reverse l r in the second line. 
                <span class="varieble">l</span> and <span class="varieble">r</span> are the indices of the first and last elements 
                of the subarray to be reversed, assuming that 
                 the array is indexed <span class="varieble">1</span> from <span class="varieble">n</span> to . 
                Here <span class="varieble">d[l...r]</span> represents the subarray that begins at index  <span class="varieble">l</span> 
                and ends at index <span class="varieble">r</span>, both inclusive.
                </li>
            </ul>
        </div>
        If an array can be sorted both ways, by using either swap or reverse, choose swap.
        <div class="bulletpoint">If the array cannot be sorted either way, output no on the first line.</div>
        `,
        constrains: [
            `<span class="varieble">2 &#8804 n &#8804 100000 </span>`,
            `<span class="varieble">0 &#8804 arr[i] &#8804 1000000 </span>`,
            `All <span class="varieble">arr[i]</span> are distinct`,
        ],
        inputFormat: `The first line contains a single integer <span class="varieble">n </span>, the size of <span class="varieble">arr</span>.
        The next line contains <span class="varieble">n</span> space-separated integers <span class="varieble">arr[i]</span> where <span class="varieble">1 &#8804 i &#8804 n </span>.`,
        return: `int: the length of the longest subset of <span class="varieble">S</span> meeting the criteria`,
        sampleCases: [
            {
                input: [`[3, 1, 2]`],
                output: ['no'],
                explanation: {
                    text: `It is impossible to sort by one single operation.`,
                    explanationOutput: null,
                },
            },
            {
                input: [`[1, 5, 4, 3, 2, 6]`],
                output: ['yes reverse 2 5'],
                explanation: {
                    text: `You can reverse the sub-array d[2...5] = "5 4 3 2", then the array becomes sorted.`,
                    explanationOutput: null,
                },
            },
            {
                input: [`[1, 2, 5, 4, 3, 6]`],
                output: ['yes reverse 3 5'],
            },
        ],
        inputs: ['arr'],
    },
]
