import * as trpc from '@trpc/server'
import type { AuthenticatedTrpcRouterContextType } from '@/server/utils/context'

export const createRouter = () => trpc.router<AuthenticatedTrpcRouterContextType>()
