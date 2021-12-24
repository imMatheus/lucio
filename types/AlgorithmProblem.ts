type String = 'string'
type Integer = 'integer'
type Float = 'float'
type Double = 'double'
type Char = 'char'
type StringArray = 'string[]'
type IntegerArray = 'integer[]'
type FloatArray = 'float[]'
type DoubleArray = 'double[]'
type CharArray = 'char[]'

type InputType =
	| String
	| Integer
	| Float
	| Double
	| Char
	| StringArray
	| IntegerArray
	| FloatArray
	| DoubleArray
	| CharArray

interface Input {
	input: string
	type: InputType
}

export interface SampleCases {
	input: Array<Input>
	output: Array<number | string>
	explanation?: {
		text?: string
		explanationOutput?: Array<string>
	}
}

export interface SubmitCases {
	input: Array<string>
	output: Array<string>
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export default interface AlgorithmProblem {
	name: string
	difficulty: Difficulty
	description: string
	constrains: Array<string>
	inputFormat: string
	output: string
	sampleCases: Array<SampleCases>
	submitCases?: Array<SubmitCases>
	inputs: Array<Input>
}
