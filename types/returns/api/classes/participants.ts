import { ClassRoomInterface } from '@models/ClassRoom'
import { UserInterface } from '@models/User'

export type Participants = {
	userId: UserInterface
	joinedAt: Date
	role: 'student' | 'admin'
}[]

export type Data = {
	message: string | null
	participants: Participants | null
}
