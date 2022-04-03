import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
	signup: User
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
	createUserInput: CreateUserInput
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

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = { __typename?: 'Query'; users: Array<{ __typename?: 'User'; name: string }> }

export const GetUsersDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetUsers' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'users' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>
