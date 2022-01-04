import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<ToastProvider>
				<ModalProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ModalProvider>
			</ToastProvider>
		</UserProvider>
	)
}

export default MyApp
