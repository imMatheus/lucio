import React from 'react'
import { arrayEquals } from '@/utils/arrayEquals'
import Color from './Color'
import { colors } from '@/constants'

interface Props {
	currentColors: [string, string]
	setColors: React.Dispatch<React.SetStateAction<[string, string]>>
}

const Index: React.FC<Props> = ({ currentColors, setColors }) => {
	return (
		<div className="my-2 flex max-w-3xl flex-wrap gap-2">
			<Color colors={[colors.theme, colors.theme]} currentColors={currentColors} setColors={setColors} />
			{/* <Color colors={['#A71D31', '#A71D31']} currentColors={currentColors} setColors={setColors} /> */}
			<Color colors={['#FF9B42', '#FF9B42']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#00916e', '#00916e']} currentColors={currentColors} setColors={setColors} />
			{/* <Color colors={['#dd9787', '#dd9787']} currentColors={currentColors} setColors={setColors} /> */}
			{/* <Color colors={['#f7567c', '#f7567c']} currentColors={currentColors} setColors={setColors} /> */}
			<Color colors={[colors.blurple, colors.blurple]} currentColors={currentColors} setColors={setColors} />
			<Color colors={[colors.apple, colors.apple]} currentColors={currentColors} setColors={setColors} />
			<Color colors={[colors.carnelian, colors.carnelian]} currentColors={currentColors} setColors={setColors} />
			<Color colors={[colors.bee, colors.bee]} currentColors={currentColors} setColors={setColors} />
			<Color colors={[colors.fuchsia, colors.fuchsia]} currentColors={currentColors} setColors={setColors} />
			{/* <Color colors={['#3d2c2e', '#3d2c2e']} currentColors={currentColors} setColors={setColors} /> */}
			<Color colors={['#606c38', '#606c38']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#ED6A5A', '#F4F1BB']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#071E22', '#1D7874']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#3a0ca3', '#4895ef']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#F75C03', '#2274A5']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#14213d', '#fca311']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#0aefff', '#deff0a']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#00916e', '#ffcf00']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#301A4B', '#6DB1BF']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#F7B2AD', '#333232']} currentColors={currentColors} setColors={setColors} />
			{/* <Color colors={['#93B7BE', '#F1FFFA']} currentColors={currentColors} setColors={setColors} /> */}
			<Color colors={['#93A8AC', '#424B54']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#EDAE49', '#D1495B']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#1d3958', '#ab2836']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#160f29', '#368f8b']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#000000', '#502F4C']} currentColors={currentColors} setColors={setColors} />
			<Color colors={['#F18805', '#F0A202']} currentColors={currentColors} setColors={setColors} />
		</div>
	)
}

export default Index
