import AlgorithmProblem from 'types/AlgorithmProblem'

type typeProblems = AlgorithmProblem[]

export const problems: typeProblems = [
	{
		name: 'Simple Addition',
		difficulty: 'easy',
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
				input: ['-981', '-54'],

				output: ['-1035']
			},
			{
				input: ['69', '69'],
				output: ['138']
			},
			{
				input: ['12', '12'],
				output: ['24']
			},
			{
				input: ['35', '-35'],
				output: ['0']
			}
		],
		inputs: [
			{ input: 'a', type: 'integer' },
			{ input: 'b', type: 'integer' }
		]
	},
	{
		name: 'Palindrome Number',
		difficulty: 'easy',
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
				input: ['987'],
				output: [`false`]
			},
			{
				input: ['111'],
				output: [`true`]
			},
			{
				input: ['1001'],
				output: [`true`]
			},
			{
				input: ['9'],
				output: [`true`]
			},
			{
				input: ['123456789'],
				output: [`false`]
			}
		],
		inputs: [{ input: 'x', type: 'integer' }]
	},
	{
		name: 'Multiplication',
		difficulty: 'easy',
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
				input: ['69', '69'],
				output: ['4761']
			},
			{
				input: ['7', '7'],
				output: ['0']
			},
			{
				input: ['1', '70'],
				output: ['70']
			},
			{
				input: ['-120', '3'],
				output: ['-120']
			}
		],
		inputs: [
			{ input: 'x', type: 'integer' },
			{ input: 'y', type: 'integer' }
		]
	},
	{
		name: 'Number Of Letters',
		difficulty: 'easy',
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
				input: ['e', 'egegeahsdfyegdajebcsdfyegdajebcheavcaebuebu'],
				output: ['10']
			},
			{
				input: ['j', 'gdykajcbaksdnscnsacnkasdknnsd'],
				output: ['10']
			},
			{
				input: ['m', 'memememememememe'],
				output: ['8']
			}
		],

		inputs: [
			{ input: 'letter', type: 'string' },
			{ input: 's', type: 'string' }
		]
	},
	{
		name: 'Score The Name',
		difficulty: 'easy',
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
				input: ['MATHEUSMENDESBARATADEALMEIDA'],
				output: ['244']
			},
			{
				input: ['QWQWASZXDESREGG'],
				output: ['215']
			},
			{
				input: ['ZZZZZZZZA'],
				output: ['209']
			}
		],
		inputs: [{ input: 'n', type: 'string' }]
	},
	{
		name: 'Counting Valleys',
		difficulty: 'medium',
		sampleCases: [
			{
				input: [
					{ input: '8', type: 'integer' },
					{ input: `"UDDDUDUU"`, type: 'string' }
				],
				output: [1],
				explanation: {
					text: `If we represent <span class="variable">_</span> as sea level, a step up as <span class="variable">/</span>, and a step down as <span class="variable">&#92</span>, the hike can be drawn as:`,
					explanationOutput: [' _/&#92      _', '    &#92    /', '     &#92/&#92/']
				}
			},
			{
				input: [
					{ input: '6', type: 'integer' },
					{ input: `"DUDUDU"`, type: 'string' }
				],
				output: ['3']
			}
		],
		submitCases: [
			{
				input: ['26', `"DDUDUUUUDDUUDDUDUDUDUDUDDU"`],
				output: ['2']
			},
			{
				input: ['28', `"DUDUDUDUDUDUDUDUDDUDUDUDDUUU"`],
				output: ['9']
			},
			{
				input: ['48', `"DUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDDUDDUDUDUDUDUUU"`],
				output: ['17']
			},
			{
				input: ['16', `"UUUUUUUUDDDDDDDD"`],
				output: ['0']
			}
		],
		inputs: [
			{ input: 'steps', type: 'integer' },
			{ input: 'path', type: 'string' }
		]
	},

	{
		name: 'Almost Sorted',
		difficulty: 'hard',
		sampleCases: [
			{
				input: [{ input: '[3,1,2]', type: 'integer[]' }],
				output: ['no'],
				explanation: {
					text: `It is impossible to sort by one single operation.`
				}
			},
			{
				input: [{ input: '[1, 5, 4, 3, 2, 6]', type: 'integer[]' }],
				output: ['yes reverse 2 5'],
				explanation: {
					text: `You can reverse the sub-array <span class="variable">d[2...5]</span> = "5 4 3 2", then the array becomes sorted.`
				}
			},
			{
				input: [{ input: '[1, 2, 5, 4, 3, 6]', type: 'integer[]' }],
				output: ['yes swap 3 5']
			}
		],
		submitCases: [
			// {
			// 	input: [{ input: 'MATHEUSMENDESBARATADEALMEIDA', type: 'string' }],
			// 	output: [244]
			// },
			{ input: ['[20, 21, 22, 23, 24, 25]'], output: ['yes'] },
			{ input: ['[10, 14, 12, 9, 24, 25]'], output: ['no'] },
			{ input: ['[1, 2, 5, 4, 3, 6]'], output: ['yes swap 3 5'] },
			{ input: ['[1, 5, 4, 3, 2, 6]'], output: ['yes reverse 2 5'] },
			{ input: ['[80, 82, 84, 86, 88, 87]'], output: ['yes swap 5 6'] }
		],
		inputs: [{ input: 'arr', type: 'integer[]' }]
	}
]
