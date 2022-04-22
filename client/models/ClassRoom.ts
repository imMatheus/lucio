import { Schema, model, Model, models, Document } from 'mongoose'
import { PrivacyEnum } from '@/types/ClassType'
import { colors } from '@/constants'

export interface ClassRoomInterface extends Document {
	name: string
	owner: string
	code: string
	privacy: PrivacyEnum
	theme: [string, string]
	members: [
		{
			userId: string
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
		// @ts-ignore
		owner: { type: Schema.Types.ObjectId, ref: 'User', immutable: true, required: true },
		code: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			immutable: true
		},
		theme: [{ type: String, default: colors.theme, trim: true }],
		privacy: {
			type: String,
			default: PrivacyEnum.Public,
			trim: true,
			enum: Object.values(PrivacyEnum)
		},
		members: [
			{
				userId: {
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
