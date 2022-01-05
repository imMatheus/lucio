import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ToastProvider>
			<ModalProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ModalProvider>
		</ToastProvider>
	)
}

export default MyApp
