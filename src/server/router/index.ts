// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { meRouter } from './me'
import { protectedExampleRouter } from './protected-example-router'

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('me.', meRouter)
	.merge('auth.', protectedExampleRouter)

// export type definition of API
export type AppRouter = typeof appRouter
