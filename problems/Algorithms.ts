import AlgorithmProblem from 'types/AlgorithmProblem'
import { Difficulty, InputEnum } from '@/types/AlgorithmProblem'

type typeProblems = AlgorithmProblem[]

export const problems = [
	{
		name: 'Simple Addition',
		difficulty: Difficulty.easy,
		sampleCases: [
			{
				input: [
					{ input: '9', inputType: InputEnum.Integer },
					{ input: '6', inputType: InputEnum.Integer }
				],
				output: ['15']
			},
			{
				input: [
					{ input: '108', inputType: InputEnum.Integer },
					{ input: '12', inputType: InputEnum.Integer }
				],
				output: ['120']
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
			{ input: 'a', inputType: InputEnum.Integer },
			{ input: 'b', inputType: InputEnum.Integer }
		]
	},
	{
		name: 'Palindrome Number',
		difficulty: Difficulty.easy,
		sampleCases: [
			{
				input: [{ input: '121', inputType: InputEnum.Integer }],
				output: [`true`]
			},
			{
				input: [{ input: '69', inputType: InputEnum.Integer }],
				output: [`false`]
			},
			{
				input: [{ input: '-919', inputType: InputEnum.Integer }],
				output: [`false`]
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
		inputs: [{ input: 'x', inputType: InputEnum.Integer }]
	},
	{
		name: 'Multiplication',
		difficulty: Difficulty.easy,
		sampleCases: [
			{
				input: [
					{ input: '10', inputType: InputEnum.Integer },
					{ input: '10', inputType: InputEnum.Integer }
				],
				output: [100]
			},
			{
				input: [
					{ input: '5', inputType: InputEnum.Integer },
					{ input: '3', inputType: InputEnum.Integer }
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
			{ input: 'x', inputType: InputEnum.Integer },
			{ input: 'y', inputType: InputEnum.Integer }
		]
	},
	{
		name: 'Number Of Letters',
		difficulty: Difficulty.easy,
		sampleCases: [
			{
				input: [
					{ input: 'l', inputType: 'string' },
					{ input: 'helloworld', inputType: 'string' }
				],
				output: [3]
			},
			{
				input: [
					{ input: 'n', inputType: 'string' },
					{ input: 'drillmasher', inputType: 'string' }
				],
				output: [0]
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
			{ input: 'letter', inputType: 'string' },
			{ input: 's', inputType: 'string' }
		]
	},
	{
		name: 'Score The Name',
		difficulty: Difficulty.easy,
		sampleCases: [
			{
				input: [{ input: 'LUCIO', inputType: 'string' }],
				output: [60]
			},
			{
				input: [{ input: 'ABBA', inputType: 'string' }],
				output: [6]
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
		inputs: [{ input: 'n', inputType: 'string' }]
	},
	{
		name: 'Counting Valleys',
		difficulty: Difficulty.medium,
		sampleCases: [
			{
				input: [
					{ input: '8', inputType: InputEnum.Integer },
					{ input: `"UDDDUDUU"`, inputType: 'string' }
				],
				output: [1]
			},
			{
				input: [
					{ input: '6', inputType: InputEnum.Integer },
					{ input: `"DUDUDU"`, inputType: 'string' }
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
			{ input: 'steps', inputType: InputEnum.Integer },
			{ input: 'path', inputType: 'string' }
		]
	},
	{
		name: 'Almost Sorted',
		difficulty: Difficulty.medium,
		sampleCases: [
			{
				input: [{ input: '[3,1,2]', inputType: 'integer[]' }],
				output: ['no']
			},
			{
				input: [{ input: '[1, 5, 4, 3, 2, 6]', inputType: 'integer[]' }],
				output: ['yes reverse 2 5']
			},
			{
				input: [{ input: '[1, 2, 5, 4, 3, 6]', inputType: 'integer[]' }],
				output: ['yes swap 3 5']
			}
		],
		submitCases: [
			{ input: ['[20, 21, 22, 23, 24, 25]'], output: ['yes'] },
			{ input: ['[10, 14, 12, 9, 24, 25]'], output: ['no'] },
			{ input: ['[1, 2, 5, 4, 3, 6]'], output: ['yes swap 3 5'] },
			{ input: ['[1, 5, 4, 3, 2, 6]'], output: ['yes reverse 2 5'] },
			{ input: ['[80, 82, 84, 86, 88, 87]'], output: ['yes swap 5 6'] }
		],
		inputs: [{ input: 'arr', inputType: 'integer[]' }]
	}
]
