type String = 'string'
type Integer = 'integer'
type Float = 'float'
type Double = 'double'
type Char = 'char'
type StringArray = Array<string>
type IntegerArray = Array<Integer>
type FloatArray = Array<Float>
type DoubleArray = Array<Double>
type CharArray = Array<Char>

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

export interface sampleCases {
	input: Array<Input>
	output: Array<number | string>
	explanation?: {
		text?: string
		explanationOutput?: Array<string>
	}
}

export default interface AlgorithmProblem {
	problemName: string
	difficulty: 'easy' | 'medium' | 'hard'
	description: string
	constrains: Array<string>
	inputFormat: string
	output: string
	sampleCases: Array<sampleCases>
	submitCases?: Array<sampleCases>
	inputs: Array<Input>
}
