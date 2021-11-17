import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
function MyApp({ Component, pageProps }: AppProps) {
    try {
        return (
            <ToastProvider>
                <AuthProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthProvider>
            </ToastProvider>
        )
    } catch (error) {
        alert(error)
        console.log(error)
    }
}
export default MyApp
