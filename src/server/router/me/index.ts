import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const meRouter = createProtectedRouter().query('me', {
	resolve: async ({ ctx }) => {
		const session = ctx.session
		if (!session.user) return { user: null }
		const userFromDB = await prisma.user.findUnique({ where: { id: session.userId } })

		return {
			user: userFromDB
		}
	}
})
