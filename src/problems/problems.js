export const problems = [
    {
        problemName: 'Simple addition',
        difficulty: 'easy',
        problemDescription: `given two integers, <span class="variable">a</span> and <span class="variable">b</span>, return the sum of <span class="variable">a</span> + <span class="variable">b</span>`,
        inputFormat: `<span class="variable">a</span> a integer, <span class="variable">b</span> a integer `,
        constrains: [
            '<span class="variable">-Infinity</span> > <span class="variable">a</span> < <span class="variable">Infinity</span>',
            '<span class="variable">-Infinity</span> > <span class="variable">b</span> < <span class="variable">Infinity</span>',
        ],
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
        problemDescription: `given three number, <span class="variable">X</span>, <span class="variable">Y</span>, <span class="variable">Z</span>, return the product of <span class="variable">X</span> * <span class="variable">Y</span> * <span class="variable">Z</span>`,
        inputFormat: `<span class="variable">X</span> a number, <span class="variable">Y</span> a number, <span class="variable">Z</span> a number`,
        constrains: [
            '<span class="variable">X</span> a number',
            '<span class="variable">Y</span> a number',
            '<span class="variable">Z</span> a number',
        ],
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
        problemDescription: `given a string, <span class="variable">S</span>, and a single letter, <span class="variable">Letter</span>, return the number of instances that the letter <span class="variable">Letter</span> appears in the string <span class="variable">S</span>`,
        inputFormat: `<span class="variable">S</span> a string containing lowercase letters, <span class="variable">Letter</span> a single lowercase letter`,
        constrains: [
            `0 &#8804 <span class="variable">S</span> &#x3c 100000  `,
            `<span class="variable">S[i]</span> &#x2208 <span class="variable">a-z</span>`,
            `<span class="variable">Letter</span> &#x2208 <span class="variable">a-z</span>`,
        ],
        sampleCases: [
            {
                input: [`'l'`, `'helloworld'`],
                output: [3],
                explanation: {
                    text: `In the string <span class="variable">'helloworld'</span> the letter <span class="variable">l</span> appears 3 times`,
                },
            },
            {
                input: [`'b'`, `'uraqt'`],
                output: [0],
                explanation: {
                    text: `In the string <span class="variable">'uraqt'</span> the letter <span class="variable">b</span> doesn't appears, so we return 0`,
                },
            },
        ],
        inputs: ['letter', 's'],
    },
    {
        problemName: 'Score The Name',
        difficulty: 'easy',
        problemDescription: `given a name, <span class="variable">n</span>, calculate the alphabetical value for the letters of the name. The alphabetical value of a letter is it's place in the alphabet.`,
        inputFormat: `<span class="variable">n</span> a single name`,
        constrains: [
            ' <span class="variable">n</span> < <span class="variable">100</span>',
            ' <span class="variable">n[i]</span> &#x2208 <span class="variable">[A-Z]</span>',
        ],
        sampleCases: [
            {
                input: ['LUCIO'],
                output: [60],
                explanation: {
                    text: `The alphabetical value of each letter in the name, Lucio, is <span class="variable">12 + 21 + 3 + 9 + 15 = 60</span>`,
                },
            },
            {
                input: ['ABBA'],
                output: [6],
                explanation: {
                    text: `The alphabetical value of each letter in the name, ABBA, is <span class="variable">1 + 2 + 2 + 1 = 6</span>`,
                },
            },
        ],
        inputs: ['n'],
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
                An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly <span class="variable">steps</span> steps, for every step it was noted if it was an uphill, <span class="variable">U</span> , or a downhill, <span class="variable">D</span> step. Hikes always start and end at sea level, and each step up or down represents a <span class="variable">1</span> unit change in altitude.
              
        <div class="bulletpoint">A level.</div>
        <div class="bulletpoint">A valley is a sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to sea level.</div>
        Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.


                 `,
        constrains: [
            ` <span class="variable">2 < steps < 1000</span>`,
            `<span class="variable">path[i] = "U"</span> or <span class="variable">path[i] = "D"</span>`,
        ],
        inputFormat: `The first line contains an integer <span class="variable">steps</span>, the number of steps in the hike.
        The second line contains a single string  <span class="variable">path</span>, of   <span class="variable">steps</span>characters that describe the path.`,
        // constrains: [`0 < n < 100`],
        return: `int: the number of valleys traversed`,
        sampleCases: [
            {
                input: [8, `'UDDDUDUU'`],
                output: [1],
                explanation: {
                    text: `If we represent <span class="variable">_</span> as sea level, a step up as <span class="variable">/</span>, and a step down as <span class="variable">&#92</span>, the hike can be drawn as:`,
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
        <div class="bulletpoint">If the array is already sorted, output <span class="variable">yes</span> on the first line. You do not need to output anything else.</div>
        <div class="bulletpoint">If you can sort this array using one single operation (from the two permitted operations) then output <span class="variable">yes</span> on the first line and then:
            <ul class="numberlist">
                <li>
                If elements can only be swapped, <span class="variable">d[p]</span> and <span class="variable">d[q]</span>,
                output <span class="variable">swap p q </span> in the second line.  
                <span class="variable">p</span> and <span class="variable">q</span> are the indices of the elements to be swapped, 
                assuming that the array is indexed from <span class="variable">1</span> to <span class="variable">n</span>.
                </li>
                <li>
                If elements can only be reversed, for the segment <span class="variable">d[p...q]</span>, output <span class="variable">reverse p q</span> in the second line. 
                <span class="variable">p</span> and <span class="variable">q</span> are the indices of the first and last elements 
                of the subarray to be reversed, assuming that 
                 the array is indexed <span class="variable">1</span> from <span class="variable">n</span> to . 
                Here <span class="variable">d[p...q]</span> represents the subarray that begins at index  <span class="variable">p</span> 
                and ends at index <span class="variable">q</span>, both inclusive.
                </li>
            </ul>
        </div>
        If an array can be sorted both ways, by using either swap or reverse, choose swap.
        <div class="bulletpoint">If the array cannot be sorted either way, output no on the first line.</div>
        `,
        constrains: [
            `<span class="variable">2 &#8804 n &#8804 100000 </span>`,
            `<span class="variable">0 &#8804 arr[i] &#8804 1000000 </span>`,
            `All <span class="variable">arr[i]</span> are distinct`,
        ],
        inputFormat: `The first line contains a single integer <span class="variable">n</span>, the size of <span class="variable">arr</span>.
        The next line contains <span class="variable">n</span> space-separated integers <span class="variable">arr[i]</span> where <span class="variable">1 &#8804 i &#8804 n </span>.`,
        return: `int: the length of the longest subset of <span class="variable">S</span> meeting the criteria`,
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
                    text: `You can reverse the sub-array <span class="variable">d[2...5]</span> = "5 4 3 2", then the array becomes sorted.`,
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
