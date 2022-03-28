import { ClassRoomInterface } from '@/models/ClassRoom'

export type Data = {
	message: string | null
	class:
		| (ClassRoomInterface & {
				_id: any
		  })
		| null
}
