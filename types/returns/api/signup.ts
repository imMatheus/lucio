import { UserInterface } from '@/models/User'

export type Data = {
	user: UserInterface | null
	token: string | null
	message: string | null
}
