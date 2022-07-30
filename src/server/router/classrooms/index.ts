import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const classroomsRouter = createProtectedRouter().query('getClassrooms', {
	resolve: async ({ ctx }) => {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				id: ctx.session.userId
			}
		})

		return {
			hello: 'world'
		}
	}
})
