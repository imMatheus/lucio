import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'

export const classroomsRouter = createProtectedRouter().query('getClassrooms', {
	resolve: async ({ ctx }) => {
		const classrooms = await prisma.classroom.findMany({
			where: {
				members: {
					some: {
						userId: ctx.session.userId
					}
				}
			}
		})

		return classrooms
	}
})
