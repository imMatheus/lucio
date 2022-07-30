import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/classnavbar/index'
import PaddingContainer from '@/components/classes/PaddingContainer'
import ColorSelector from '@/components/classes/colorselector'
import { useRouter } from 'next/router'

const Settings: NextPage = () => {
	const router = useRouter()
	const { classId } = router.query
	const [colors, setColors] = useState<[string, string]>(['', '']) //|| classData.theme)

	return (
		<PaddingContainer>
			<ClassNavbar />
			settings - {colors.toString()}
			<ColorSelector currentColors={colors} setColors={setColors} />
		</PaddingContainer>
	)
}

export default Settings
