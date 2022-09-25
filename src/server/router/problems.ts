import { createRouter } from './context'

export const problemsRouter = createRouter().query('getAll', {
	async resolve({ ctx }) {
		return await ctx.prisma.problem.findMany({})
	}
})
