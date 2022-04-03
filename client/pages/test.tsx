import React from 'react'
import { useQuery, gql } from 'urql'
import { Problem } from '@/gql'
import { client, ssrCache } from './_app'

const ProblemsQuery = gql`
	query {
		problems {
			id
			name
		}
	}
`

export async function getServerSideProps() {
	await client.query(ProblemsQuery).toPromise()
	return { props: { urqlState: ssrCache.extractData() } }
}

const Test: React.FC = (props) => {
	console.log('props')
	console.log(props)

	const [result] = useQuery<{ problems: Problem }>({
		query: ProblemsQuery
	})

	// console.log(result.data?.problems)
	return (
		<div>
			<h2>test</h2>
			<h1>{JSON.stringify(result)}</h1>
		</div>
	)
}

export default Test
