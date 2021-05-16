import { db } from '../firebase'

export const problems = {
    SimpleAddition: {
        problemName: 'Simple Addition',
        difficulty: 'easy',
        problemDescription: `given two integers, <span class="variable">a</span> and <span class="variable">b</span>, return the sum of <span class="variable">a</span> + <span class="variable">b</span>`,
        inputFormat: `<span class="variable">a</span> a integer, <span class="variable">b</span> a integer `,
        constrains: [
            '<span class="variable">-Infinity</span> < <span class="variable">a</span> < <span class="variable">Infinity</span>',
            '<span class="variable">-Infinity</span> < <span class="variable">b</span> < <span class="variable">Infinity</span>',
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
        submitCases: [
            {
                input: [-981, -54],
                output: [-1035],
            },
            {
                input: [69, 69],
                output: [138],
            },
            {
                input: [12, 12],
                output: [24],
            },
            {
                input: [35, -35],
                output: [0],
            },
        ],
        inputs: ['a', 'b'],
    },
    PalindromeNumber: {
        problemName: 'Palindrome Number',
        difficulty: 'easy',
        problemDescription: `
        Given an integer <span class="variable">x</span>,
        return <span class="variable">true</span> if <span class="variable">x</span> is palindrome integer.
        An integer is a palindrome when it reads the same backward as forward. 
        For example, <span class="variable">121</span> is palindrome while <span class="variable">123</span> is not.
        `,
        inputFormat: `<span class="variable">x</span> a integer`,
        constrains: [
            '<span class="variable">-1000</span> <= <span class="variable">x</span> < <span class="variable">1000</span>',
        ],
        output: '<span class="variable">Boolean:</span> If the number is a palindrome or not',

        sampleCases: [
            {
                input: [121],
                output: [`true`],
            },
            {
                input: [69],
                output: [`false`],
                explanation: {
                    text: `From left to right, it reads <span class="variable">69</span>.
                From right to left, it becomes <span class="variable">96</span>. Therefore it is not a palindrome.`,
                },
            },
            {
                input: [-919],
                output: [`false`],
                explanation: {
                    text: `From left to right, it reads <span class="variable">-919</span>.
                From right to left, it becomes <span class="variable">919-</span>. Therefore it is not a palindrome.`,
                },
            },
        ],
        submitCases: [
            {
                input: [-981],
                output: [`false`],
            },
            {
                input: [696],
                output: [`true`],
            },
            {
                input: [0],
                output: [`true`],
            },
            {
                input: [35],
                output: [`false`],
            },
        ],
        inputs: ['x'],
    },
    Multiplication: {
        problemName: 'Multiplication',
        difficulty: 'easy',
        problemDescription: `Given three numbers, <span class="variable">X</span>, <span class="variable">Y</span>, return the product of <span class="variable">X</span> * <span class="variable">Y</span> `,
        inputFormat: `<span class="variable">X</span> a number, <span class="variable">Y</span> a number`,
        constrains: [
            '<span class="variable">X</span> a number',
            '<span class="variable">Y</span> a number',
        ],
        sampleCases: [
            { input: [30, 3], output: [90], explanation: { text: `30 * 3 = 90` } },
            { input: [3, 5], output: [15] },
        ],
        submitCases: [
            {
                input: [69, 69],
                output: [4761],
            },
            {
                input: [0, 7],
                output: [0],
            },
            {
                input: [1, 70],
                output: [70],
            },
            {
                input: [-40, 3],
                output: [-120],
            },
        ],
        inputs: ['x', 'y'],
    },
    NumberOfLetters: {
        problemName: 'Number Of Letters',
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
                input: [`"l"`, `"helloworld"`],
                output: [3],
                explanation: {
                    text: `In the string <span class="variable">"helloworld"</span> the letter <span class="variable">l</span> appears 3 times`,
                },
            },
            {
                input: [`"n"`, `"drillmasher"`],
                output: [0],
                explanation: {
                    text: `In the string <span class="variable">"drillmasher"</span> the letter <span class="variable">n</span> doesn't appears, so we return 0`,
                },
            },
        ],
        submitCases: [
            {
                input: [`"e"`, `"egegeahsdfyegdajebcsdfyegdajebcheavcaebuebu"`],
                output: [10],
            },
            {
                input: [`"j"`, `"gdykajcbaksdnscnsacnkasdknnsd"`],
                output: [10],
            },
            {
                input: [`"m"`, `"memememememememe"`],
                output: [8],
            },
        ],

        inputs: ['letter', 's'],
    },
    ScoreTheName: {
        problemName: 'Score The Name',
        difficulty: 'easy',
        problemDescription: `Given a single name, <span class="variable">n</span>, calculate the alphabetical value for the letters of the name. The alphabetical value of a letter is it"s place in the alphabet.`,
        inputFormat: `<span class="variable">n</span> a single word containing uppercase letters.`,
        constrains: [
            ' <span class="variable">n</span> < <span class="variable">100</span>',
            ' <span class="variable">n[i]</span> &#x2208 <span class="variable">[A-Z]</span>',
        ],
        output: `int: The alphabetical value of the given name.`,
        sampleCases: [
            {
                input: [`"LUCIO"`],
                output: [60],
                explanation: {
                    text: `The alphabetical value of each letter in the name, Lucio, is <span class="variable">12 + 21 + 3 + 9 + 15 = 60</span>`,
                },
            },
            {
                input: [`"ABBA"`],
                output: [6],
                explanation: {
                    text: `The alphabetical value of each letter in the name, ABBA, is <span class="variable">1 + 2 + 2 + 1 = 6</span>`,
                },
            },
        ],
        submitCases: [
            {
                input: [`"MATHEUSMENDESBARATADEALMEIDA"`],
                output: [244],
            },
            {
                input: [`"QWQWASZXDESREGG"`],
                output: [215],
            },
            {
                input: [`"ZZZZZZZZA"`],
                output: [209],
            },
        ],
        inputs: ['n'],
    },
    AlphabeticalJustice: {
        problemName: 'Alphabetical Justice',
        difficulty: 'easy',
        problemDescription: `Given a string, <span class="variable">str</span>, convert the string so that each letter is in alphabetical order.`,
        inputFormat: `<span class="variable">str</span> a string containing uppercase letters.`,
        output: `string: The string <span class="variable">str</span> with its letters in alphabetical order.`,
        constrains: [
            '<span class="variable">0</span> < <span class="variable">str</span> < <span class="variable">1000</span>',
            '<span class="variable">str[i]</span> &#x2208 <span class="variable">[A-Z]</span>',
        ],
        sampleCases: [
            {
                input: [`"LUCIO"`],
                output: [`CILOU`],
            },
            {
                input: [`"SWEDEN"`],
                output: [`DEENSW`],
            },
        ],
        submitCases: [
            {
                input: [`"DGYBSCBYVAEDUJBCUEBHZCV"`],
                output: [`ABBBBCCCDDEEGHJSUUVVYYZ`],
            },
            {
                input: [`"YATSVSSBHSYSBJHHSHSHKAI"`],
                output: [`AABBHHHHHIJKSSSSSSSTVYY`],
            },
            {
                input: [`"WESDWEDSEWDSEWDHSBVZVFFF"`],
                output: [`BDDDDEEEEFFFHSSSSVVWWWWZ`],
            },
        ],
        inputs: ['str'],
    },

    MinMaxSum: {
        problemName: 'MinMax Sum',
        difficulty: 'easy',
        problemDescription: `Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.`,
        inputFormat: `A single line of five space-separated integers.`,
        output: `Print two space-separated integers on one line: the minimum sum and the maximum sum of elements.`,
        sampleCases: [
            {
                input: [`[1, 2, 3, 4, 5]`],
                output: [[10 + ' ' + 14]],
            },
            {
                input: [`[3, 3, 3, 3, 3]`],
                output: [[12 + ' ' + 12]],
            },
        ],
        submitCases: [
            {
                input: [`[69, 812, 11, 0, 981]`],
                output: [[892 + ' ' + 1873]],
            },
            {
                input: [`[9, 312, 1, 4, 312]`],
                output: [[326 + ' ' + 637]],
            },
            {
                input: [`[90, 32, 1000, 40, 61]`],
                output: [[223 + ' ' + 1191]],
            },
            {
                input: [`[99, 23, 100, 32, 1]`],
                output: [[155 + ' ' + 254]],
            },
        ],
        inputs: ['arr'],
    },
    CountingValleys: {
        problemName: 'Counting Valleys',
        difficulty: 'medium',

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
        output: `int: The number of valleys traveled.`,
        sampleCases: [
            {
                input: [8, `"UDDDUDUU"`],
                output: [1],
                explanation: {
                    text: `If we represent <span class="variable">_</span> as sea level, a step up as <span class="variable">/</span>, and a step down as <span class="variable">&#92</span>, the hike can be drawn as:`,
                    explanationOutput: [' _/&#92      _', '    &#92    /', '     &#92/&#92/'],
                },
            },
            {
                input: [6, `"DUDUDU"`],
                output: [3],
            },
        ],
        submitCases: [
            {
                input: [26, `"DDUDUUUUDDUUDDUDUDUDUDUDDU"`],
                output: [2],
            },
            {
                input: [28, `"DUDUDUDUDUDUDUDUDDUDUDUDDUUU"`],
                output: [9],
            },
            {
                input: [48, `"DUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDDUDDUDUDUDUDUUU"`],
                output: [17],
            },
            {
                input: [16, `"UUUUUUUUDDDDDDDD"`],
                output: [0],
            },
        ],
        inputs: ['steps', 'path'],
    },
    AlmostSorted: {
        problemName: 'Almost Sorted',
        difficulty: 'hard',

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
        output: `int: the length of the longest subset of <span class="variable">S</span> meeting the criteria`,
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
                output: ['yes swap 3 5'],
            },
        ],
        submitCases: [
            { input: [`[20, 21, 22, 23, 24, 25]`], output: ['yes'] },
            { input: [`[10, 14, 12, 9, 24, 25]`], output: ['no'] },
            { input: [`[1, 2, 5, 4, 3, 6]`], output: ['yes swap 3 5'] },
            { input: [`[1, 5, 4, 3, 2, 6]`], output: ['yes reverse 2 5'] },
            { input: [`[80, 82, 84, 86, 88, 87]`], output: ['yes swap 5 6'] },
        ],
        inputs: ['arr'],
    },
}
