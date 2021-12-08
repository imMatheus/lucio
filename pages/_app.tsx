import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import React from 'react'

function withErrorBoundary(WrappedComponent: React.FC) {
	try {
		const Component = (
			<ToastProvider>
				<WrappedComponent />
			</ToastProvider>
		)
		return Component
	} catch (error) {
		console.log('ghjkhghj')
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	const App: React.FC = () => (
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	)

	try {
		return withErrorBoundary(App)
	} catch (error) {
		alert('shit happend')
		console.log('e: ', error)
	}
}

export default MyApp
