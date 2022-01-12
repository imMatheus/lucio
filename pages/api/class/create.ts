import type { NextApiRequest, NextApiResponse } from 'next'
import { run } from '@/utils/mongodb'
import { ClassRoom } from '@models/ClassRoom'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	await run()

	console.log(req.headers.cookie)
	console.log(req.cookies)

	const classRoom = await ClassRoom.create({
		code: '120',
		name: '33333',
		owner: 'abc0909',
		participants: []
		// {
		// 	_id: '61ddf68c447aa738270d7fdf',
		// 	joinedAt: new Date(),
		// 	role: 'admin'
		// }
		// _id:ObjectId("61ddf68c447aa738270d7fdf")
	})

	res.status(200).json({ classRoom })
}
