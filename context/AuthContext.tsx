import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserInterface } from '@models/User'
import axios from 'axios'

type IUser = UserInterface | null

interface Context {
	currentUser: IUser
	fetchingUser: boolean
	signup: (email: string, password: string, username: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => void
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: true,
	signup: async () => {},
	login: async () => {},
	logout: () => {}
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser>(null)
	const [fetchingUser, setFetchingUser] = useState(true)

	const signup = async (email: string, password: string, username: string) => {
		try {
			const res: any = await axios.post('/api/auth/signup', {
				password,
				email,
				username
			})
			console.log('res: ', res)
			// localStorage.setItem('token', res.data.token)
		} catch (error) {
			alert(error)
			console.log('shit happened on line 44')

			console.error(error)
		}
	}

	const login = async (email: string, password: string) => {}

	const logout = () => {}

	useEffect(() => {
		console.log('shiiiii')
		function storageEventHandler() {
			console.log('hi from storageEventHandler')
			console.log(localStorage.getItem('name'))
		}
		window.addEventListener('storage', (e) => {
			console.log('e')
			console.log(e)
		})
		window.onstorage = () => {
			// When local storage changes, dump the list to
			// the console.
			console.log('hej hej')
			// console.log(JSON.parse(window.localStorage.getItem('token')));
		}
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
