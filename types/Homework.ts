type Homework = {
	title: string
	description: string
	lastlyUpdatedAt: Date
	createdAt: Date
	createdBy: string
	draft: true
	files: File[]
	id: string
}

export default Homework
