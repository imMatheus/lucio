import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ToastProvider>
				<ModalProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ModalProvider>
			</ToastProvider>
		</AuthProvider>
	)
}

export default MyApp
