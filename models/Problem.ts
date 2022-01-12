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
		markdown: { type: String, required: true },
		sampleCases: [
			{
				input: [
					{
						input: { type: String, trim: true, required: true },
						inputType: { type: String, enum: Object.values(InputEnum), required: true }
					}
				],
				output: [
					{
						type: String,
						trim: true,
						required: true
					}
				]
			}
		],
		submitCases: [
			{
				input: [
					{
						type: String,
						trim: true,
						required: true
					}
				],
				output: [
					{
						type: String,
						trim: true,
						required: true
					}
				]
			}
		],
		inputs: [
			{
				input: { String, required: true },

				inputType: {
					type: String,
					enum: Object.values(InputEnum),
					required: true
				}
			}
		]
	},
	{ timestamps: true }
)

export const Problem = models['Problem'] || model<ProblemInterface>('Problem', schema)
