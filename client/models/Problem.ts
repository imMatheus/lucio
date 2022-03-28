import { Schema, model, models, Model } from 'mongoose'
import AlgorithmProblem, { Difficulty, InputEnum } from '@/types/AlgorithmProblem'

const schema = new Schema<AlgorithmProblem>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			minlength: 1,
			maxLength: 60
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
						type: { type: String, enum: Object.values(InputEnum), required: true }
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
				input: { type: String, required: true },
				type: {
					type: String,
					enum: Object.values(InputEnum),
					required: true
				}
			}
		]
	},
	{ timestamps: true }
)

export const Problem: Model<AlgorithmProblem> = models['Problem'] || model<AlgorithmProblem>('Problem', schema)
