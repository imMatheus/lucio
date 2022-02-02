import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserInterface } from '@models/User'
import axios from 'axios'
import { Data as meData } from '@/returns/api/me'
import { Data as logoutData } from '@/returns/api/logout'
import { Data as loginData } from '@/returns/api/login'
import { Data as signupData } from '@/returns/api/signup'
import Cookies from 'cookies'
import { useToast } from './ToastContext'

type IUser = UserInterface | null

interface Context {
	currentUser: IUser
	fetchingUser: boolean
	signup: (email: string, password: string, username: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: true,
	signup: async () => {},
	login: async () => {},
	logout: async () => {}
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser>(null)
	const [fetchingUser, setFetchingUser] = useState(true)
	const { setToast } = useToast()

	const fetchUser = async () => {
		setFetchingUser(true)

		const { data }: { data: meData } = await axios.get('/api/auth/me')
		setFetchingUser(false)
		if (!data || !data.user || !data.token) return setCurrentUser(null)

		setCurrentUser(data.user)
	}

	const signup = async (email: string, password: string, username: string) => {
		try {
			const { data }: { data: signupData } = await axios.post('/api/auth/signup', {
				password,
				email,
				username
			})

			if (data.user) {
				await fetchUser()
			}
		} catch (error) {
			alert(error)

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
			return
		}

		setToast({ message: 'Could not logout', type: 'error' })
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
		logout
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
