import { Problem } from './problem'
import path from 'path'
import fs from 'fs'

export async function getProblems(): Promise<Problem[]> {
	console.log(path.join(process.cwd(), './list'))
	const files = fs.readdirSync(path.join(process.cwd(), './src/server/problems/list'))

	console.log(files) // array of file names

	for (let i = 0; i < files.length; i++) {
		const folderName = files[i]
		console.log(folderName)

		const markdown = fs.readFileSync(path.join(__dirname, `./list/${folderName}/markdown.md`), 'utf8')
		const { default: test } = await import('./list/simple-addition/problem')
		console.log('we made it here noobs')
		console.log(markdown)
		console.log(test)
	}
	return []
}

// export const problems: Problem[] =
