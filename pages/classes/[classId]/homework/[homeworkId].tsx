import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
// import Homework from 'types/Homework'
import { useRouter } from 'next/router'
import PaddingContainer from '@/components/classes/PaddingContainer'

const HomeworkId: NextPage = () => {
	const router = useRouter()
	const { homeworkId } = router.query
	// const [homework, setHomework] = useState<Homework>()

	return <PaddingContainer>hh homeworkId:{homeworkId}</PaddingContainer>
}

export default HomeworkId
