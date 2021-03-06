import { Author } from './Author'

export interface Message {
	text: string
	author: Author
	createdAt: Date
	edited: boolean
}
