import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '@/server/router'
import { createAuthenticatedTrpcContext } from '@/server/utils/context'

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: createAuthenticatedTrpcContext
})
