import type { NextFetchEvent, NextRequest } from 'next/server'
import { userHasAccessToClass } from '@/utils/userHasAccessToClass'
import axios from 'axios'

// https://github.com/vercel/examples/blob/main/edge-functions/hostname-rewrites/pages/_middleware.ts

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
	async function init() {
		console.log(':::::::::::::::::::::::::::::::::::::::::::')
		const res = await axios.get('http://localhost:3000/api/auth/me')
		console.log(res)

		if (req.page.name?.startsWith('/classes/[classId]') && req.page.params && req.page.params.classId) {
			console.log('inside')
			// console.log(req.nextUrl.searchParams)
			// console.log(req.nextUrl.search)
			// console.log(req.headers)

			const { pathname } = req.nextUrl

			const classId = req.page.params.classId
			console.log(pathname)

			const resp = await userHasAccessToClass(classId, req.cookies.jwt)
			console.log(resp)
		}
	}
	init()

	// const { classId } = query
	// const cookies = new Cookies(req, res)

	// // get token from the users cookie
	// const token = cookies.get('jwt')

	// if (!resp) {
	// 	res.statusCode = 302
	// 	res.setHeader('Location', `/classes`)
	// }

	// if (pathname.startsWith(`/_sites`)) {
	// 	return new Response(null, { status: 404 })
	// }

	// if (
	// 	!pathname.includes('.') && // exclude all files in the public folder
	// 	!pathname.startsWith('/api') // exclude all API routes
	// ) {
	// 	// rewrite to the current hostname under the pages/sites folder
	// 	// the main logic component will happen in pages/sites/[site]/index.tsx
	// 	return NextResponse.rewrite(`/_sites/${currentHost}${pathname}`)
	// }
}
