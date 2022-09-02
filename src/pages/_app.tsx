import '../styles/globals.scss'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { EditorSettingsProvider } from '@/context/EditorSettingsContext'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<AuthProvider>
				<EditorSettingsProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</EditorSettingsProvider>
			</AuthProvider>
		</SessionProvider>
	)
}

import { withTRPC } from '@trpc/next'
import type { AppRouter } from '@/server/router'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'

function getBaseUrl() {
	if (typeof window) return '' // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
	config() {
		const url = `${getBaseUrl()}/api/trpc`

		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error)
				}),
				httpBatchLink({
					url
				})
			]
		}
	},
	ssr: false // TODO: make sure this dosent break on true
})(MyApp)
