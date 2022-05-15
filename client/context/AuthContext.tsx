import React, { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from './ToastContext'
import { useRouter } from 'next/router'
import { JWT_USER_SIGN_TTL } from '@/constants/index'

interface Context {
	// currentUser: IUser
	// fetchingUser: boolean
	// signup: (signupInput: CreateUserInput) => Promise<void>
	// login: (loginInput: LoginInput) => Promise<void>
	// logout: () => Promise<void>
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
	// const [currentUser, setCurrentUser] = useState<IUser>(null)
	// const [fetchingUser, setFetchingUser] = useState(true)
	const router = useRouter()
	const { setToast } = useToast()

	// const signup = async (signupInput: CreateUserInput) => {
	// 	console.log('gggg')
	// 	try {
	// 		const res = await signupMutation({ variables: { signupInput } })
	// 		console.log('res: ', res)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// const login = async (loginInput: LoginInput) => {
	// 	loginMutation({ variables: { loginInput } })
	// }

	const logout = async () => {
		// if (data.success) {
		// 	// await fetchUser()
		// 	router.replace('/register')
		// } else {
		// 	setToast({ message: 'Could not logout', type: 'error' })
		// }
	}

	const value = {
		// currentUser,
		// fetchingUser,
		// signup,
		// login,
		// logout
		// updateUser
	}
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
