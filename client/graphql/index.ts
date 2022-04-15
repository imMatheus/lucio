import { gql } from '@apollo/client'

// for the alias imports, makes it so all exports from generated.ts can be imported from this file
export * from './generated'

// export const FULL_USER = gql`
// 	fragment FullUser on User {
// 		bio
// 		id
// 		name
// 		email
// 		email_verified
// 		location
// 		school
// 		provider
// 		createdAt
// 		updatedAt
// 	}
// `

// export const ME = gql`
// 	${FULL_USER}
// 	query Me {
// 		me {
// 			# email
// 			...FULL_USER
// 		}
// 	}
// `

// export const LOGIN = gql`
// 	${FULL_USER}
// 	mutation login($loginInput: LoginInput!) {
// 		login(loginInput: $loginInput) {
// 			access_token
// 			user {
// 				...FULL_USER
// 			}
// 		}
// 	}
// `

// export const SIGNUP = gql`
// 	${FULL_USER}
// 	mutation signup($signupInput: SignupInput!) {
// 		signup(signupInput: $signupInput) {
// 			...FULL_USER
// 		}
// 	}
// `
