import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
	const hello = trpc.useQuery(['me.me'])
	const { data: session, status } = useSession()

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<pre className="mx-auto w-96 bg-green-100 text-sm">{JSON.stringify(hello, null, 2)}</pre>
			<pre className="mx-auto w-96 bg-red-100 text-sm">{JSON.stringify(session, null, 2)}</pre>
			<pre className="mx-auto w-96 bg-blue-100 text-sm">{JSON.stringify(status, null, 2)}</pre>

			<button className="bg-green-200" onClick={() => signIn()}>
				Sign in
			</button>
			<button className="bg-red-200" onClick={() => signOut()}>
				Sign out
			</button>

			<div className="h-96 w-96 bg-clr-bg-grayed-dark">hejhej</div>
		</>
	)
}

export default Home
