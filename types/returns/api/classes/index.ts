import { ClassRoomInterface } from '@/models/ClassRoom'

export type Data = {
	class:
		| (ClassRoomInterface & {
				_id: any
		  })
		| null
}
