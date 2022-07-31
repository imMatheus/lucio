export { colors } from './colors'
export const JWT_USER_SIGN_TTL = 30 * 24 * 60 * 60 // 30 days
export const MAX_LENGTHS = {
	CLASS_NAME: 50,
	CLASS_CODE: 10,
	CLASS_COLOR: 10,

	USER_NAME: 50,
	USER_BIO: 191,
	USER_LOCATION: 30
}
export enum CLASS_PRIVACY {
	OPEN = 'OPEN',
	INVITE = 'INVITE',
	CLOSED = 'CLOSED'
}
