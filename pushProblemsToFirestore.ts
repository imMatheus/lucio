import { fs } from '@/firebase/index'
import { readdir } from 'fs/promises'
import path from 'path'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

async function main() {
	const markdownFiles = await readdir(path.join(serverRuntimeConfig.PROJECT_ROOT, `markdown`))
	console.log('markdown files:', markdownFiles)
}

main()
