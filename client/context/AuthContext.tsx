import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserInterface } from '@/models/User'
import axios from 'axios'
import { Data as logoutData } from '@/types/returns/api/logout'
import Cookies from 'cookies'
import { useToast } from './ToastContext'
import { Data as updateData } from '@/api/auth/update'
import { useRouter } from 'next/router'
import { User, LoginInput, CreateUserInput, useLoginMutation, useSignupMutation, useMeQuery } from '@/gql'
import { client } from '@/apollo'

type IUser = User | null

interface Context {
	currentUser: IUser
	fetchingUser: boolean
	signup: (signupInput: CreateUserInput) => Promise<void>
	login: (loginInput: LoginInput) => Promise<void>
	logout: () => Promise<void>
	// updateUser: ({ name, bio }: UpdateUserProps) => Promise<updateData>
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: true,
	signup: async () => {},
	login: async () => {},
	logout: async () => {}
	// updateUser: async () => ({ errorType: null, message: null })
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser>(null)
	// const [fetchingUser, setFetchingUser] = useState(true)
	const router = useRouter()
	const { setToast } = useToast()

	const { data: userData, loading: fetchingUser, error, fetchMore } = useMeQuery()
	const [loginMutation, { error: loginError, data: loginData }] = useLoginMutation()
	const [signupMutation, { error: signupError, data: signupData }] = useSignupMutation()

	console.log('userData: ', userData)
	console.log('loginData: ', loginData)
	console.log('signupData: ', signupData)

	const me = async () => {
		fetchMore({})
		// setFetchingUser(true)

		// const { data }: { data: meData } = await axios.get('/api/auth/me')

		// setFetchingUser(false)
		// if (!data || !data.user || !data.token) return setCurrentUser(null)

		// setCurrentUser(data.user)
	}

	const signup = async (signupInput: CreateUserInput) => {
		signupMutation({ variables: { signupInput } })

		// const { redirect_url } = router.query

		// if (redirect_url && typeof redirect_url === 'string') {
		// 	router.replace(redirect_url)
		// } else {
		// 	router.replace('/classes')
		// }
	}

	const login = async (loginInput: LoginInput) => {
		loginMutation({ variables: { loginInput } })
	}

	const logout = async () => {
		const { data }: { data: logoutData } = await axios.get('/api/auth/logout')

		if (data.success) {
			// await fetchUser()
			router.replace('/register')
		} else {
			setToast({ message: 'Could not logout', type: 'error' })
		}
	}

	// const updateUser = async (props: UpdateUserProps): Promise<updateData> => {
	// 	const { data }: { data: updateData } = await axios.put('/api/auth/update', { ...props })

	// if (data.message === null) {
	// 	await fetchUser()
	// }

	// return data

	// setToast({ message: 'Could not logout', type: 'error' })
	// }

	// useEffect(() => {
	// 	async function init() {
	// 		await fetchUser()
	// 	}
	// 	init()
	// 	return () => {}
	// }, [])

	const value = {
		currentUser,
		fetchingUser,
		signup,
		login,
		logout
		// updateUser
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
