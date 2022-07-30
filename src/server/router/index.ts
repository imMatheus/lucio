import { createRouter } from '@/server/utils/create-router'
import { classroomsRouter } from './classrooms'
import { meRouter } from './me'
import { problemsRouter } from './problems'

// Merge your api routes here
export const appRouter = createRouter()
	.merge('classrooms.', classroomsRouter)
	.merge('problems.', problemsRouter)
	.merge('me.', meRouter)

// export type definition of API
export type AppRouter = typeof appRouter
