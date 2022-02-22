import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserInterface } from '@models/User'
import axios from 'axios'
import { Data as meData } from '@/returns/api/me'
import { Data as logoutData } from '@/returns/api/logout'
import { Data as loginData } from '@/returns/api/login'
import { Data as signupData } from '@/returns/api/signup'
import Cookies from 'cookies'
import { useToast } from './ToastContext'
import { Data as updateData } from '@/api/auth/update'
import { useRouter } from 'next/router'

type IUser = UserInterface | null

export interface UpdateUserProps {
	name?: string
	bio?: string
}

interface Context {
	currentUser: IUser
	fetchingUser: boolean
	signup: (email: string, password: string, name: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	updateUser: ({ name, bio }: UpdateUserProps) => Promise<updateData>
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: true,
	signup: async () => {},
	login: async () => {},
	logout: async () => {},
	updateUser: async () => ({ errorType: null, message: null })
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser>(null)
	const [fetchingUser, setFetchingUser] = useState(true)
	const router = useRouter()
	const { setToast } = useToast()

	const fetchUser = async () => {
		setFetchingUser(true)

		const { data }: { data: meData } = await axios.get('/api/auth/me')
		setFetchingUser(false)
		if (!data || !data.user || !data.token) return setCurrentUser(null)

		setCurrentUser(data.user)
	}

	const signup = async (email: string, password: string, name: string) => {
		try {
			const { data }: { data: signupData } = await axios.post('/api/auth/signup', {
				password,
				email,
				name
			})

			if (data.user) {
				await fetchUser()
				const { redirect_url } = router.query
				console.log('ass')
				console.log(router.query)
				console.log(redirect_url)
				if (redirect_url && typeof redirect_url === 'string') {
					router.replace(redirect_url)
				} else {
					router.replace('/classes')
				}
			}
		} catch (error) {
			console.error(error)
		}
	}

	const login = async (email: string, password: string) => {
		const { data }: { data: loginData } = await axios.post('/api/auth/login', {
			email,
			password
		})

		if (data.success) await fetchUser()
	}

	const logout = async () => {
		const { data }: { data: logoutData } = await axios.get('/api/auth/logout')

		if (data.success) {
			await fetchUser()
			router.replace('/register')
		} else {
			setToast({ message: 'Could not logout', type: 'error' })
		}
	}

	const updateUser = async ({ name, bio }: UpdateUserProps): Promise<updateData> => {
		const { data }: { data: updateData } = await axios.put('/api/auth/update', { name, bio })

		console.log(data)
		console.log(name, bio)

		console.log('97777777')

		if (data.message === null) {
			await fetchUser()
		}

		return data

		// setToast({ message: 'Could not logout', type: 'error' })
	}

	useEffect(() => {
		async function init() {
			await fetchUser()
		}
		init()
		return () => {}
	}, [])

	const value = {
		currentUser,
		fetchingUser,
		signup,
		login,
		logout,
		updateUser
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
