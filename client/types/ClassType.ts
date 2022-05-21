export enum PrivacyEnum {
	Public = 'public',
	Invite = 'invite',
	Closed = 'closed'
}

export type ClassType = {
	name: string
	code: string
	owner: string
	theme: [string, string]
	members: string[]
	privacy: PrivacyEnum
}
