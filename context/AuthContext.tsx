import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, UserInterface } from '@models/User'

type IUser = UserInterface | null

interface Context {
	currentUser: IUser
	fetchingUser: boolean
	signup: () => void
	login: () => void
	logout: () => void
}

const AuthContext = createContext<Context>({
	currentUser: null,
	fetchingUser: true,
	signup: () => {},
	login: () => {},
	logout: () => {}
})

export function useAuth() {
	return useContext(AuthContext)
}

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser>(null)
	const [fetchingUser, setFetchingUser] = useState(true)

	const signup = () => {}

	const login = () => {}

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
