import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useToast } from '@/context/ToastContext'
import Head from 'next/head'
import Button from '@/components/button'
import HomeworkCard from '@/components/classes/HomeworkCard'
import ClassNavbar from '@/components/classes/classnavbar/index'
import PaddingContainer from '@/components/classes/PaddingContainer'

const Index: NextPage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const { classId } = router.query
	const { setToast } = useToast()

	return (
		<PaddingContainer>
			<Head>
				{/* <title>{classData?.name} | Homework</title> */}
				<meta property="og:title" content="My page title" key="title" />
			</Head>
			<ClassNavbar />
			homework
		</PaddingContainer>
	)
}

export default Index
