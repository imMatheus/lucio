import mongoose from 'mongoose'

export async function run(): Promise<void> {
	if (!process.env.MONGODB_URI) {
		throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
		return
	}

	const opts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		bufferCommands: false
	}

	await mongoose.connect(process.env.MONGODB_URI, opts)
}

run().catch((err) => console.error(err))
