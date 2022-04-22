import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any
}

export type ClassroomType = {
	__typename?: 'ClassroomType'
	code: Scalars['String']
	createdAt: Scalars['DateTime']
	id: Scalars['ID']
	members: Array<MemberType>
	name: Scalars['String']
	owner: Scalars['String']
	privacy: Scalars['String']
	theme: Array<Scalars['String']>
	updatedAt: Scalars['DateTime']
}

export type CreateClassroomInput = {
	name: Scalars['String']
	privacy: Scalars['String']
	theme: Array<Scalars['String']>
}

export type CreateProblemInput = {
	/** Example field (placeholder) */
	exampleField: Scalars['Int']
}

export type CreateUserInput = {
	bio?: InputMaybe<Scalars['String']>
	email: Scalars['String']
	location?: InputMaybe<Scalars['String']>
	name: Scalars['String']
	password: Scalars['String']
	school?: InputMaybe<Scalars['String']>
}

export enum Difficulty {
	Easy = 'easy',
	Hard = 'hard',
	Medium = 'medium'
}

export type Input = {
	input: Scalars['String']
	inputType: InputEnum
}

export enum InputEnum {
	Char = 'Char',
	CharArray = 'CharArray',
	Double = 'Double',
	DoubleArray = 'DoubleArray',
	Float = 'Float',
	FloatArray = 'FloatArray',
	Integer = 'Integer',
	IntegerArray = 'IntegerArray',
	String = 'String',
	StringArray = 'StringArray'
}

export type LoginInput = {
	password: Scalars['String']
	username: Scalars['String']
}

export type LoginResponse = {
	__typename?: 'LoginResponse'
	access_token: Scalars['String']
	user?: Maybe<User>
}

export type MemberType = {
	__typename?: 'MemberType'
	email: Scalars['String']
	joinedAt: Scalars['DateTime']
	name: Scalars['String']
	role: Scalars['String']
	userId: Scalars['ID']
}

export type Mutation = {
	__typename?: 'Mutation'
	createClassroom: ClassroomType
	createProblem: Problem
	createUser: User
	joinClassroom: ClassroomType
	login: LoginResponse
	removeClassroom: ClassroomType
	removeProblem: Problem
	removeUser: User
	signup: LoginResponse
	updateClassroom: ClassroomType
	updateProblem: Problem
	updateUser: User
}

export type MutationCreateClassroomArgs = {
	createClassroomInput: CreateClassroomInput
}

export type MutationCreateProblemArgs = {
	createProblemInput: CreateProblemInput
}

export type MutationCreateUserArgs = {
	createUserInput: CreateUserInput
}

export type MutationJoinClassroomArgs = {
	code: Scalars['String']
}

export type MutationLoginArgs = {
	loginInput: LoginInput
}

export type MutationRemoveClassroomArgs = {
	id: Scalars['Int']
}

export type MutationRemoveProblemArgs = {
	id: Scalars['Int']
}

export type MutationRemoveUserArgs = {
	id: Scalars['Int']
}

export type MutationSignupArgs = {
	signupInput: CreateUserInput
}

export type MutationUpdateClassroomArgs = {
	updateClassroomInput: UpdateClassroomInput
}

export type MutationUpdateProblemArgs = {
	updateProblemInput: UpdateProblemInput
}

export type MutationUpdateUserArgs = {
	updateUserInput: UpdateUserInput
}

export type Problem = {
	__typename?: 'Problem'
	difficulty: Difficulty
	id: Scalars['ID']
	markdown: Scalars['String']
	name: Scalars['String']
	sampleCases: Array<SampleCase>
}

export type Query = {
	__typename?: 'Query'
	classroom: ClassroomType
	classrooms: Array<ClassroomType>
	me: User
	problem: Problem
	problems: Array<Problem>
	user: User
	users: Array<User>
}

export type QueryClassroomArgs = {
	id: Scalars['String']
}

export type QueryProblemArgs = {
	id: Scalars['Int']
}

export type QueryUserArgs = {
	id: Scalars['String']
}

export type SampleCase = {
	inputs: Input
	outputs: Array<Scalars['String']>
}

export type UpdateClassroomInput = {
	id: Scalars['Int']
	name?: InputMaybe<Scalars['String']>
	privacy?: InputMaybe<Scalars['String']>
	theme?: InputMaybe<Array<Scalars['String']>>
}

export type UpdateProblemInput = {
	/** Example field (placeholder) */
	exampleField?: InputMaybe<Scalars['Int']>
	id: Scalars['Int']
}

export type UpdateUserInput = {
	bio?: InputMaybe<Scalars['String']>
	id: Scalars['ID']
	location?: InputMaybe<Scalars['String']>
	name?: InputMaybe<Scalars['String']>
	school?: InputMaybe<Scalars['String']>
}

export type User = {
	__typename?: 'User'
	bio?: Maybe<Scalars['String']>
	createdAt: Scalars['DateTime']
	email: Scalars['String']
	email_verified: Scalars['Boolean']
	id: Scalars['ID']
	location?: Maybe<Scalars['String']>
	name: Scalars['String']
	provider: Scalars['String']
	school?: Maybe<Scalars['String']>
	updatedAt: Scalars['DateTime']
}

export type FullUserFragment = {
	__typename?: 'User'
	bio?: string | null
	id: string
	name: string
	email: string
	email_verified: boolean
	location?: string | null
	school?: string | null
	provider: string
	createdAt: any
	updatedAt: any
}

export type LoginMutationVariables = Exact<{
	loginInput: LoginInput
}>

export type LoginMutation = {
	__typename?: 'Mutation'
	login: {
		__typename?: 'LoginResponse'
		access_token: string
		user?: {
			__typename?: 'User'
			bio?: string | null
			id: string
			name: string
			email: string
			email_verified: boolean
			location?: string | null
			school?: string | null
			provider: string
			createdAt: any
			updatedAt: any
		} | null
	}
}

export type SignupMutationVariables = Exact<{
	signupInput: CreateUserInput
}>

export type SignupMutation = {
	__typename?: 'Mutation'
	signup: {
		__typename?: 'LoginResponse'
		access_token: string
		user?: {
			__typename?: 'User'
			bio?: string | null
			id: string
			name: string
			email: string
			email_verified: boolean
			location?: string | null
			school?: string | null
			provider: string
			createdAt: any
			updatedAt: any
		} | null
	}
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
	__typename?: 'Query'
	me: {
		__typename?: 'User'
		bio?: string | null
		id: string
		name: string
		email: string
		email_verified: boolean
		location?: string | null
		school?: string | null
		provider: string
		createdAt: any
		updatedAt: any
	}
}

export const FullUserFragmentDoc = gql`
	fragment FullUser on User {
		bio
		id
		name
		email
		email_verified
		location
		school
		provider
		createdAt
		updatedAt
	}
`
export const LoginDocument = gql`
	mutation login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			access_token
			user {
				...FullUser
			}
		}
	}
	${FullUserFragmentDoc}
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const SignupDocument = gql`
	mutation signup($signupInput: CreateUserInput!) {
		signup(signupInput: $signupInput) {
			access_token
			user {
				...FullUser
			}
		}
	}
	${FullUserFragmentDoc}
`
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupInput: // value for 'signupInput'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options)
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>
export const MeDocument = gql`
	query me {
		me {
			...FullUser
		}
	}
	${FullUserFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
	const options = { ...defaultOptions, ...baseOptions }
	return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
