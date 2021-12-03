import AlgorithmProblem from 'types/AlgorithmProblem'

type typeProblems = { readonly [name: string]: AlgorithmProblem }

export const problems: typeProblems = {
	SimpleAddition: {
		problemName: 'Simple Addition',
		difficulty: 'easy',
		output: 'an integer',
		description: `given two integers, <span class="variable">a</span> and <span class="variable">b</span>, return the sum of <span class="variable">a</span> + <span class="variable">b</span>`,
		inputFormat: `<span class="variable">a</span> an integer, <span class="variable">b</span> an integer `,
		constrains: [
			'<span class="variable">-Infinity</span> < <span class="variable">a</span> < <span class="variable">Infinity</span>',
			'<span class="variable">-Infinity</span> < <span class="variable">b</span> < <span class="variable">Infinity</span>'
		],
		sampleCases: [
			{
				input: [
					{ input: '9', type: 'integer' },
					{ input: '6', type: 'integer' }
				],
				output: [15],
				explanation: { text: `9 + 6 = 15` }
			},
			{
				input: [
					{ input: '108', type: 'integer' },
					{ input: '12', type: 'integer' }
				],
				output: [120]
			}
		],
		submitCases: [
			{
				input: [
					{ input: '-981', type: 'integer' },
					{ input: '-54', type: 'integer' }
				],

				output: [-1035]
			},
			{
				input: [
					{ input: '69', type: 'integer' },
					{ input: '69', type: 'integer' }
				],
				output: [138]
			},
			{
				input: [
					{ input: '12', type: 'integer' },
					{ input: '12', type: 'integer' }
				],
				output: [24]
			},
			{
				input: [
					{ input: '35', type: 'integer' },
					{ input: '-35', type: 'integer' }
				],
				output: [0]
			}
		],
		inputs: [
			{ input: 'a', type: 'integer' },
			{ input: 'b', type: 'integer' }
		]
	},
	PalindromeNumber: {
		problemName: 'Palindrome Number',
		difficulty: 'easy',
		description: `
        Given an integer <span class="variable">x</span>,
        return <span class="variable">true</span> if <span class="variable">x</span> is palindrome integer.
        An integer is a palindrome when it reads the same backward as forward.
        For example, <span class="variable">121</span> is palindrome while <span class="variable">123</span> is not.
        `,
		inputFormat: `<span class="variable">x</span> a integer`,
		constrains: [
			'<span class="variable">-1000</span> <= <span class="variable">x</span> < <span class="variable">1000</span>'
		],
		output: '<span class="variable">Boolean:</span> If the number is a palindrome or not',

		sampleCases: [
			{
				input: [{ input: '121', type: 'integer' }],
				output: [`true`]
			},
			{
				input: [{ input: '69', type: 'integer' }],
				output: [`false`],
				explanation: {
					text: `From left to right, it reads <span class="variable">69</span>.
                From right to left, it becomes <span class="variable">96</span>. Therefore it is not a palindrome.`
				}
			},
			{
				input: [{ input: '-919', type: 'integer' }],
				output: [`false`],
				explanation: {
					text: `From left to right, it reads <span class="variable">-919</span>.
                From right to left, it becomes <span class="variable">919-</span>. Therefore it is not a palindrome.`
				}
			}
		],
		submitCases: [
			{
				input: [{ input: '987', type: 'integer' }],
				output: [`false`]
			},
			{
				input: [{ input: '111', type: 'integer' }],
				output: [`true`]
			},
			{
				input: [{ input: '1001', type: 'integer' }],
				output: [`true`]
			},
			{
				input: [{ input: '9', type: 'integer' }],
				output: [`true`]
			},
			{
				input: [{ input: '123456789', type: 'integer' }],
				output: [`false`]
			}
		],
		inputs: [{ input: 'x', type: 'integer' }]
	},
	Multiplication: {
		problemName: 'Multiplication',
		difficulty: 'easy',
		output: 'The product of x * y',
		description: `Given three numbers, <span class="variable">X</span>, <span class="variable">Y</span>, return the product of <span class="variable">X</span> * <span class="variable">Y</span> `,
		inputFormat: `<span class="variable">X</span> a number, <span class="variable">Y</span> a number`,
		constrains: ['<span class="variable">x</span> a number', '<span class="variable">x</span> a number'],
		sampleCases: [
			{
				input: [
					{ input: '10', type: 'integer' },
					{ input: '10', type: 'integer' }
				],
				output: [100]
			},
			{
				input: [
					{ input: '5', type: 'integer' },
					{ input: '3', type: 'integer' }
				],
				output: [`15`]
			}
		],

		submitCases: [
			{
				input: [
					{ input: '69', type: 'integer' },
					{ input: '69', type: 'integer' }
				],
				output: [4761]
			},
			{
				input: [
					{ input: '7', type: 'integer' },
					{ input: '7', type: 'integer' }
				],
				output: [0]
			},
			{
				input: [
					{ input: '1', type: 'integer' },
					{ input: '70', type: 'integer' }
				],
				output: [70]
			},
			{
				input: [
					{ input: '-120', type: 'integer' },
					{ input: '3', type: 'integer' }
				],
				output: [-120]
			}
		],
		inputs: [
			{ input: 'x', type: 'integer' },
			{ input: 'y', type: 'integer' }
		]
	},
	NumberOfLetters: {
		problemName: 'Number Of Letters',
		difficulty: 'easy',
		output: '',
		description: `given a string, <span class="variable">S</span>, and a single letter, <span class="variable">Letter</span>, return the number of instances that the letter <span class="variable">Letter</span> appears in the string <span class="variable">S</span>`,
		inputFormat: `<span class="variable">S</span> a string containing lowercase letters, <span class="variable">Letter</span> a single lowercase letter`,
		constrains: [
			`0 &#8804 <span class="variable">S</span> &#x3c 100000  `,
			`<span class="variable">S[i]</span> &#x2208 <span class="variable">a-z</span>`,
			`<span class="variable">Letter</span> &#x2208 <span class="variable">a-z</span>`
		],
		sampleCases: [
			{
				input: [
					{ input: 'l', type: 'string' },
					{ input: 'helloworld', type: 'string' }
				],
				output: [3],
				explanation: {
					text: `In the string <span class="variable">"helloworld"</span> the letter <span class="variable">l</span> appears 3 times`
				}
			},
			{
				input: [
					{ input: 'n', type: 'string' },
					{ input: 'drillmasher', type: 'string' }
				],
				output: [0],
				explanation: {
					text: `In the string <span class="variable">"drillmasher"</span> the letter <span class="variable">n</span> doesn't appears, so we return 0`
				}
			}
		],
		submitCases: [
			{
				input: [
					{ input: 'e', type: 'string' },
					{ input: 'egegeahsdfyegdajebcsdfyegdajebcheavcaebuebu', type: 'string' }
				],
				output: [10]
			},
			{
				input: [
					{ input: 'j', type: 'string' },
					{ input: 'gdykajcbaksdnscnsacnkasdknnsd', type: 'string' }
				],
				output: [10]
			},
			{
				input: [
					{ input: 'm', type: 'string' },
					{ input: 'memememememememe', type: 'string' }
				],
				output: [8]
			}
		],

		inputs: [
			{ input: 'letter', type: 'string' },
			{ input: 's', type: 'string' }
		]
	},
	ScoreTheName: {
		problemName: 'Score The Name',
		difficulty: 'easy',
		description: `Given a single name, <span class="variable">n</span>, calculate the alphabetical value for the letters of the name. The alphabetical value of a letter is it"s place in the alphabet.`,
		inputFormat: `<span class="variable">n</span> a single word containing uppercase letters.`,
		constrains: [
			' <span class="variable">n</span> < <span class="variable">100</span>',
			' <span class="variable">n[i]</span> &#x2208 <span class="variable">[A-Z]</span>'
		],
		output: `int: The alphabetical value of the given name.`,
		sampleCases: [
			{
				input: [{ input: 'LUCIO', type: 'string' }],
				output: [60],
				explanation: {
					text: `The alphabetical value of each letter in the name, Lucio, is <span class="variable">12 + 21 + 3 + 9 + 15 = 60</span>`
				}
			},
			{
				input: [{ input: 'ABBA', type: 'string' }],
				output: [6],
				explanation: {
					text: `The alphabetical value of each letter in the name, ABBA, is <span class="variable">1 + 2 + 2 + 1 = 6</span>`
				}
			}
		],
		submitCases: [
			{
				input: [{ input: 'MATHEUSMENDESBARATADEALMEIDA', type: 'string' }],
				output: [244]
			},
			{
				input: [{ input: 'QWQWASZXDESREGG', type: 'string' }],
				output: [215]
			},
			{
				input: [{ input: 'ZZZZZZZZA', type: 'string' }],
				output: [209]
			}
		],
		inputs: [{ input: 'n', type: 'string' }]
	}
}
