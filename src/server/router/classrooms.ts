import { createProtectedRouter } from './context'
import { z } from 'zod'

export const classroomsRouter = createProtectedRouter()
	.query('getAll', {
		async resolve({ ctx }) {
			return await ctx.prisma.classroom.findMany({
				where: {
					members: {
						some: {
							userId: ctx.session.user.id
						}
					}
				},
				include: {
					_count: {
						select: {
							members: true
						}
					}
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		}
	})
	.mutation('joinClassroom', {
		input: z.object({
			code: z.string()
		}),
		resolve: async ({ ctx, input }) => {
			const classroom = await ctx.prisma.classroom.findUniqueOrThrow({
				where: { code: input.code },
				select: {
					id: true
				}
			})

			await ctx.prisma.member.create({
				data: {
					classroomId: classroom.id,
					userId: ctx.session.user.id
				}
			})

			return classroom
		}
	})
