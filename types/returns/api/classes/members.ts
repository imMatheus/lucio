import { ClassRoomInterface } from '@/models/ClassRoom'
import { UserInterface } from '@/models/User'

export type Members = {
	userId: UserInterface
	joinedAt: Date
	role: 'student' | 'admin'
}[]

export type Data = {
	message: string | null
	members: Members | null
}
