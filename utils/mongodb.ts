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

	console.log('connecting')
	await mongoose.connect(process.env.MONGODB_URI, opts)
	console.log('connected')
}

run().catch((err) => console.error(err))
