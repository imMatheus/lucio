import { Schema, model, models, Document } from 'mongoose'
import ProblemInterface, { Difficulty, InputEnum } from '@/types/AlgorithmProblem'

const schema: Schema<ProblemInterface> = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 1,
			maxLength: 100
		},
		difficulty: {
			type: String,
			required: true,
			trim: true,
			enum: Object.values(Difficulty)
		},
		markdown: String,
		sampleCases: [
			{
				input: [
					{
						input: { type: String, trim: true },
						inputType: { type: String, enum: Object.values(InputEnum) }
					}
				],
				output: [
					{
						type: String,
						trim: true
					}
				]
			}
		],
		submitCases: [
			{
				input: [
					{
						type: String,
						trim: true
					}
				],
				output: [
					{
						type: String,
						trim: true
					}
				]
			}
		],
		inputs: [
			{
				input: String,
				inputType: {
					type: String,
					enum: Object.values(InputEnum)
				}
			}
		]
	},
	{ timestamps: true }
)

export const Problem = models['Problem'] || model<ProblemInterface>('Problem', schema)
