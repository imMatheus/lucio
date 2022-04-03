import '../styles/globals.scss'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { ToastProvider } from '@/context/ToastContext'
import { ModalProvider } from '@/context/ModalContext'
import { AuthProvider } from '@/context/AuthContext'
import { EditorSettingsProvider } from '@/context/EditorSettingsContext'
import { createClient, Provider, ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql'

// setting up urql
const isServerSide = typeof window === 'undefined'
export const ssrCache = ssrExchange({ isClient: !isServerSide })

export const client = createClient({
	url: 'http://localhost:4000/graphql',
	exchanges: [ssrCache, dedupExchange, cacheExchange, fetchExchange],
	fetchOptions: () => {
		return { headers: {} }
	}
})

function MyApp({ Component, pageProps }: AppProps) {
	if (pageProps.urqlState) {
		ssrCache.restoreData(pageProps.urqlState)
	}

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
