import { createRouter } from './context'
import { faker } from '@faker-js/faker'

export const classroomsRouter = createRouter().query('getAll', {
	async resolve({ ctx }) {
		await ctx.prisma.classroom.createMany({
			data: [
				{
					name:
						faker.name.firstName() +
						' ' +
						faker.name.lastName() +
						' ' +
						faker.name.firstName() +
						' ' +
						faker.name.lastName() +
						' ' +
						faker.name.firstName() +
						' ' +
						faker.name.lastName() +
						' ' +
						faker.name.firstName() +
						' ' +
						faker.name.lastName(),
					code: Math.floor(Math.random() * 10 ** 7).toString(),
					mainColor: faker.color.rgb(),
					secondaryColor: faker.color.rgb()
				}
			]
		})
		return await ctx.prisma.classroom.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
})
