import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ToastProvider>
				<Head>
					<link
						//href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ToastProvider>
		</AuthProvider>
	)
}

export default MyApp
