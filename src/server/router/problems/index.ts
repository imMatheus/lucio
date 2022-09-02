import { z } from 'zod'
import { createRouter } from '@/server/utils/create-router'
import prisma from '@/server/utils/prisma'

export const problemsRouter = createRouter()
// .query('get', {
// 	resolve: async ({ ctx, input }) => {
// 		const res = await prisma.test.findMany({})
// 		return res
// 	}
// })
// .mutation('push', {
// 	resolve: async ({ ctx, input }) => {
// 		await prisma.test.create({
// 			data: {
// 				number: Math.floor(Math.random() * 1000)
// 			}
// 		})
// 		return {}
// 	}
// })
