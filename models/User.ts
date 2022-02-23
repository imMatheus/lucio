import { Schema, model, Model, models, Document } from 'mongoose'

export interface UserInterface extends Document {
	email: string
	password: string
	provider: string
	email_verified: boolean
	name: string
	bio?: string
	location?: string
	school?: string
}

const schema = new Schema<UserInterface>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			immutable: true,
			maxLength: 50
		},
		provider: {
			type: String,
			trim: true,
			default: 'luciocode',
			immutable: true,
			enum: ['luciocode', 'github', 'google']
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxLength: 40
		},
		bio: {
			type: String,
			maxLength: 1000,
			trim: true
		},
		location: {
			type: String,
			maxLength: 50,
			trim: true
		},
		school: {
			type: String,
			maxLength: 50,
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
