import { z } from 'zod'
import { createProtectedRouter } from '@/server/utils/create-protected-router'
import prisma from '@/server/utils/prisma'
import { MAX_LENGTHS, CLASS_PRIVACY } from '@/constants'
import { generateCode } from '@/server/utils/generateCode'

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
			let code = generateCode()
			let uniqueCode = false

			while (!uniqueCode) {
				const classroomWithSameCode = await prisma.classroom.findUnique({
					where: {
						code
					}
				})

				if (!classroomWithSameCode) uniqueCode = true
				else {
					code = generateCode()
				}
			}

			// await prisma.classroom.create({
			// 	data: {},
			// 	select: {
			// 		id: true,
			// 		code: true
			// 	}
			// })
			return {}
		}
	})
