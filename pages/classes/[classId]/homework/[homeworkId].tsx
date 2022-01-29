import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
// import Homework from 'types/Homework'
import { useRouter } from 'next/router'

const HomeworkId: NextPage = () => {
	const router = useRouter()
	const { homeworkId } = router.query
	// const [homework, setHomework] = useState<Homework>()

	return <section className="px-6 py-3">hh homeworkId:{homeworkId}</section>
}

export default HomeworkId
