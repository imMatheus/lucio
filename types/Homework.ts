import { StorageReference } from 'firebase/storage'

type Homework = {
	title: string
	description: string
	lastlyUpdatedAt: Date
	createdAt: Date
	createdBy: string
	draft: true
	files: File[] | Array<StorageReference & { downloadUrl?: string }>
	id: string
}

export default Homework
