import { Schema, model, Model, models, ObjectId, SchemaTypes } from 'mongoose'

export interface ClassRoomInterface {
	name: string
	owner: string
	code: string
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
		participants: [
			{
				_id: {
					type: SchemaTypes.ObjectId,
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
