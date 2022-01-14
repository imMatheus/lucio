import { Schema, model, Model, models } from 'mongoose'
import { PrivacyEnum } from '@/types/ClassType'

export interface ClassRoomInterface {
	name: string
	owner: string
	code: string
	privacy: PrivacyEnum
	theme: [String, String]
	participants: [
		{
			_id: string
			joinedAt: Date
			role: 'student' | 'admin'
		}
	]
}

const schema = new Schema<ClassRoomInterface>(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		owner: { type: String, immutable: true, required: true },
		code: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			immutable: true
		},
		theme: [{ type: String, default: '#2266ff', trim: true }],
		privacy: {
			type: String,
			default: PrivacyEnum.Public,
			trim: true,
			enum: Object.values(PrivacyEnum)
		},
		participants: [
			{
				_id: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
					immutable: true
				},
				joinedAt: {
					type: Date,
					immutable: true,
					default: () => Date.now()
				},
				role: {
					type: String,
					default: 'student',
					enum: ['student', 'admin']
				}
			}
		]
	},
	{ timestamps: true }
)

export const ClassRoom: Model<ClassRoomInterface> =
	models['ClassRoom'] || model<ClassRoomInterface>('ClassRoom', schema)
