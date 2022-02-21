import React, { useState } from 'react'
import type { NextPage } from 'next'
import ClassNavbar from '@/components/classes/ClassNavbar'
import PaddingContainer from '@/components/classes/PaddingContainer'
import ColorSelector from '@/components/classes/colorselector'

const Settings: NextPage = () => {
	const [colors, setColors] = useState<[string, string]>(['#2266ff', '#2266ff'])

	return (
		<PaddingContainer>
			<ClassNavbar />
			settings - {colors.toString()}
			<ColorSelector currentColors={colors} setColors={setColors} />
		</PaddingContainer>
	)
}

export default Settings
