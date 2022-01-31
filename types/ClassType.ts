export enum PrivacyEnum {
	Public = 'public',
	Invite = 'invite',
	Closed = 'closed'
}

type ClassType = {
	name: string
	code: string
	owner: string
	theme: [string, string]
	participants: string[]
	createdAt: Date
	updatedAt: Date
	_id: string
	__v: number
}

export default ClassType
