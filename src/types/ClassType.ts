export enum PrivacyEnum {
	Public = 'public',
	Invite = 'invite',
	Closed = 'closed'
}

export type ClassType = {
	name: string
	code: string
	ownerUid: string
	colors: [string, string]
	members: string[]
	privacy: PrivacyEnum
}

export type ClassTypeWithId = {
	id: string
} & ClassType
