import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@models/User'
import bcrypt from 'bcrypt'
import { run } from '@/utils/mongodb'

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials: any) {
				const email = credentials.email
				const password = credentials.password
				await run()

				const user = await User.findOne({ email })
				console.log('tryig to log in ', user)

				if (user) return loginUser({ password, user })

				return registerUser({ email, password })
			}
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		})
	]
})

const loginUser = async ({ password, user }: any) => {
	if (!user.password) {
		throw new Error('Accounts have to login with OAuth or Email.')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Password Incorrect.')
	}

	if (!user.emailVerified) {
		throw new Error('Success! Check your email.')
	}

	return user
}

const registerUser = async ({ email, password }: any) => {
	await run()
	console.log('regisng user')
	console.log('email: ', email)
	console.log('password: ', password)

	const hashPass = await bcrypt.hash(password, 12)
	const newUser = new User({ email, password: hashPass })
	await newUser.save()
	throw new Error('Success! Check your email.')
}
