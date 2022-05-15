import '../styles/globals.scss'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { EditorSettingsProvider } from '@/context/EditorSettingsContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
	)
}

export default MyApp
