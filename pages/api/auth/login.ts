import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	console.log(req)

	res.status(200).json({
		hej: 'hej'
	})
}
