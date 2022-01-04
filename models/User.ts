import { Schema, model, models } from 'mongoose'

interface UserInterface {
	tenant: string
	connection: string
	email: string
	password: string
	debug: boolean
	email_verified: boolean
}

const schema = new Schema<UserInterface>(
	{
		tenant: {
			type: String,
			required: true,
			enum: ['luciocode']
		},
		connection: {
			type: String,
			required: true,
			enum: ['MongoDB']
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		password: {
			type: String,
			required: true
		},
		debug: {
			type: Boolean,
			required: true,
			default: false
		},
		email_verified: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
)

export const User = models['User'] || model<UserInterface>('User', schema)
