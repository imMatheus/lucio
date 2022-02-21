import React from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import PaddingContainer from '@/components/classes/PaddingContainer'

const settings: NextPage = () => {
	return (
		<PaddingContainer>
			<ClassNavbar />
			settings
		</PaddingContainer>
	)
}

export default settings
