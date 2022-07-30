import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getSession } from 'next-auth/react'
import { inferAsyncReturnType } from '@trpc/server'
import type { Session } from 'next-auth'

export async function createAuthenticatedTrpcContext({ req }: CreateNextContextOptions) {
	const session: (Session & { userId?: string }) | null = await getSession({ req })

	return {
		session: session
	}
}

export type AuthenticatedTrpcRouterContextType = inferAsyncReturnType<typeof createAuthenticatedTrpcContext>
