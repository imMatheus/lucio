import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

export async function run(): Promise<void> {
	if (MONGODB_URI) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false
		}

		console.log('connect')
		await mongoose.connect(MONGODB_URI, opts)
		console.log('connected')
	}
}

run().catch((err) => console.error(err))
