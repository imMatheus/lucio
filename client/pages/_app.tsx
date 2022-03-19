import '../styles/globals.scss'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { EditorSettingsProvider } from '@/context/EditorSettingsContext'
import { createClient, Provider } from 'urql'

function MyApp({ Component, pageProps }: AppProps) {
	const client = createClient({
		url: 'http://localhost:4000/graphql'
	})

	return (
		<Provider value={client}>
			<AuthProvider>
				<ToastProvider>
					<ModalProvider>
						<EditorSettingsProvider>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</EditorSettingsProvider>
					</ModalProvider>
				</ToastProvider>
			</AuthProvider>
		</Provider>
	)
}

export default MyApp
