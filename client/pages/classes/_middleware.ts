import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// https://github.com/vercel/examples/blob/main/edge-functions/hostname-rewrites/pages/_middleware.ts

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
	// async function checkIfUserIsSingedIn() {
	// 	try {
	// 		return true
	// 	} catch (error) {
	// 		console.log(error)
	// 		return NextResponse.redirect('/')
	// 	}
	// }
	// // test
	// async function init() {
	// 	const signedIn = await checkIfUserIsSingedIn()
	// 	if (typeof signedIn !== 'boolean') return signedIn
	// 	// only check if we are in a class, that is that were ot at all the classes screen
	// 	if (req.page.name?.startsWith('/classes/[classId]') && req.page.params && req.page.params.classId) {
	// 		const classId = req.page.params.classId
	// 		// true if user has access or false if they dont have access
	// 		const resp = await userHasAccessToClass(classId, req.cookies.jwt)
	// 		if (!resp) return NextResponse.redirect('/')
	// 	}
	// 	return NextResponse.next()
	// }
	// return init()
}
