import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'

export const meRouter = createRouter()
	.query('me', {
		resolve: async ({ ctx }) => {
			const session = ctx.session
			if (!session || !session.user) return { user: null }
			const userFromDB = await prisma.user.findUnique({ where: { id: session.userId } })

			return {
				user: userFromDB
			}
		}
	})
	//TODO: remove this :)
	.query('gg', {
		resolve: async ({ ctx, input }) => {
			console.log('ggggg')

			const res = await prisma.test.findMany()

			console.log(res)

			return res
		}
	})
