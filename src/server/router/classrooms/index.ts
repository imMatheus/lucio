import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { MAX_LENGTHS, CLASS_PRIVACY, CLASS_ROLES } from '@/constants'
import { getUniqueCode } from '@/server/utils/getUniqueCode'

export const classroomsRouter = createProtectedRouter()
	.query('getClassrooms', {
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
	.mutation('create', {
		input: z.object({
			name: z.string().min(1).max(MAX_LENGTHS.CLASS_NAME),
			privacy: z.enum([CLASS_PRIVACY.OPEN, CLASS_PRIVACY.CLOSED, CLASS_PRIVACY.INVITE])
		}),
		resolve: async ({ ctx, input }) => {
			const code = await getUniqueCode()
			const { userId } = ctx.session

			const createdClass = await prisma.classroom.create({
				data: {
					code,
					name: input.name,
					mainColor: '#f00',
					secondaryColor: '#00f',
					privacy: input.privacy,
					members: {
						create: {
							userId,
							role: CLASS_ROLES.OWNER
						}
					}
				},
				select: {
					id: true,
					code: true
				}
			})

			return createdClass
		}
	})
