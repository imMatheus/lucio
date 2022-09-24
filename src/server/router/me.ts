import { createRouter } from './context'

export const meRouter = createRouter().query('me', {
	async resolve({ ctx }) {
		const { session } = ctx
		if (!session) return null
		return await ctx.prisma.user.findMany({
			where: {
				id: session.user?.id
			}
		})
	}
})
