import prisma from '@/server/utils/prisma'
import { generateCode } from './generateCode'

export const getUniqueCode = async () => {
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

	return code
}
