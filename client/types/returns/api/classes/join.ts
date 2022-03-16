import { ClassRoomInterface } from '@/models/ClassRoom'

export type Data = {
	message: string | null
	classRoom:
		| (ClassRoomInterface & {
				_id: any
		  })
		| null
}
