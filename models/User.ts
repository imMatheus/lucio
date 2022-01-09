import { Schema, model, Model, models } from 'mongoose'

export interface UserInterface {
	email: string
	password: string
	email_verified: boolean
	username: string
}

const schema = new Schema<UserInterface>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		email_verified: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

export const User: Model<UserInterface> = models['User'] || model<UserInterface>('User', schema)
