import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ToastProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ToastProvider>
		</AuthProvider>
	)
}

export default MyApp
