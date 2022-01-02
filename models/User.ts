import { Schema, model, models } from 'mongoose'

interface UserInterface {
	name: string
	age: number
}

const schema = new Schema<UserInterface>({
	name: { type: String, required: true },
	age: { type: Number, required: true }
})

export const User = models['User'] || model<UserInterface>('User', schema)
