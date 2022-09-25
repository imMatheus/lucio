import { createRouter } from './context'
// import { getProblems } from '../problems/index'
export const meRouter = createRouter().query('me', {
	async resolve({ ctx }) {
		const { session } = ctx
		// console.log('ok ok o k;;;;;;;;;')
		// const res = await getProblems()
		// console.log('end so it ended')
		// console.log(res)

		// await ctx.prisma.problem.createMany({
		// 	data: [
		// 		{
		// 			difficulty: 'EASY',
		// 			name: 'first ever problem',
		// 			markdown: `# Hello world \nThis is the first problem ever to be seen by a human fr`
		// 		},
		// 		{
		// 			difficulty: 'MEDIUM',
		// 			name: 'Phinking',
		// 			markdown: `# PHINK \n every1 gotta try it homie`
		// 		},
		// 		{
		// 			difficulty: 'EASY',
		// 			name: 'A problem ngl',
		// 			markdown: `# Wag1 \nThis is the first problem ever to be seen by a human fr`
		// 		},
		// 		{
		// 			difficulty: 'HARD',
		// 			name: 'lkandska dbkj abdjasb d',
		// 			markdown: `# Hello world \nThis is the first problem ever to be seen by a human fr`
		// 		},
		// 		{
		// 			difficulty: 'EASY',
		// 			name: 'a easy prblem',
		// 			markdown: `# Hello world \nThis is the first problem ever to be seen by a human fr`
		// 		},
		// 		{
		// 			difficulty: 'MEDIUM',
		// 			name: 'a medium problem',
		// 			markdown: `# Hello world \nThis is the first problem ever to be seen by a human fr`
		// 		},
		// 		{
		// 			difficulty: 'EASY',
		// 			name: 'can you even type, script?',
		// 			markdown: `# Hello world \nThis is the first problem ever to be seen by a human fr`
		// 		}
		// 	]
		// })

		if (!session) return null
		return await ctx.prisma.user.findMany({
			where: {
				id: session.user?.id
			}
		})
	}
})
