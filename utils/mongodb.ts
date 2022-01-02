import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI
// 'mongodb+srv://dbadmin:5VSEkv03PmTBzqz3@cluster0.5ndr8.mongodb.net/sample_restaurants?retryWrites=true&w=majority'

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
