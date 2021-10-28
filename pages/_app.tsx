import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )
}
export default MyApp
