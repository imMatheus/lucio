import { AppRouter } from '@/server/router'
import { inferProcedureOutput } from '@trpc/server'

export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['queries']> = inferProcedureOutput<
	AppRouter['_def']['queries'][TRouteKey]
>
