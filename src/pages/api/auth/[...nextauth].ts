import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			profile(profile, tokens) {
				console.log('github')

				console.log(profile)
				console.log(tokens)

				return {
					id: profile.login,
					email: profile.email?.toLowerCase(),
					image: profile.avatar_url || 'http://',
					name: profile.name || profile.login || 'freeddeee'
				}
			}
		})
	],
	callbacks: {
		session: async ({ session, user }) => {
			session.userId = user.id as string
			return Promise.resolve(session)
		}
	}
})
