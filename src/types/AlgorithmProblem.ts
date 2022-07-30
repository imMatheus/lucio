export enum InputEnum {
	String = 'string',
	Integer = 'integer',
	Float = 'float',
	Double = 'double',
	Char = 'char',
	StringArray = 'string[]',
	IntegerArray = 'integer[]',
	FloatArray = 'float[]',
	DoubleArray = 'double[]',
	CharArray = 'char[]'
}

// type InputType =
// 	| String
// 	| Integer
// 	| Float
// 	| Double
// 	| Char
// 	| StringArray
// 	| IntegerArray
// 	| FloatArray
// 	| DoubleArray
// 	| CharArray

interface Input {
	input: string
	inputType: InputEnum
}

export interface SampleCases {
	input: Array<Input>
	output: Array<string>
}

export interface SubmitCases {
	input: Array<string>
	output: Array<string>
}

export enum Difficulty {
	easy = 'easy',
	medium = 'medium',
	hard = 'hard'
}

export default interface AlgorithmProblem extends Document {
	name: string
	markdown: string
	difficulty: Difficulty
	sampleCases: Array<SampleCases>
	submitCases?: Array<SubmitCases>
	inputs: Array<Input>
}
