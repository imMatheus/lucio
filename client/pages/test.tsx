import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { ClassroomType } from '@/gql'
import { client } from '@/apollo'

const ProblemsQuery = gql`
	query {
		problems {
			id
			name
		}
	}
`

export async function getServerSideProps() {
	const data = await client.query({ query: ProblemsQuery })
	console.log(data)

	return { props: { state: data } }
}

const Test: React.FC = (props) => {
	console.log('props')
	console.log(props)

	const { data, loading, error } = useQuery<ClassroomType[]>(ProblemsQuery)

	console.log(data)
	return (
		<div>
			<h2>test</h2>
			{/* <h1>{JSON.stringify(data)}</h1> */}
		</div>
	)
}

export default Test
