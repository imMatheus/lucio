import React from 'react'
import { useToast, ToastType } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'
import Wrapper from './Wrapper'
import Text from './Text'
import { Check, X } from 'react-feather'

const Success: React.FC = () => {
	const { toast, setToast } = useToast()

	return (
		<div className="sticky top-0 z-50 bg-lime-600">
			<Wrapper>
				<div className="flex w-0 flex-1 items-center">
					<span className="flex rounded-lg bg-lime-800 p-2">
						<Check className="h-6 w-6 text-white" />
					</span>
					<Text smallText="We announced a new product!">{toast.message}</Text>
				</div>
				<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
					<button
						type="button"
						onClick={() => setToast({ message: '', type: 'success' })}
						className="-mr-1 flex rounded-md p-2 transition-colors hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
					>
						<span className="sr-only">Dismiss</span>
						<X className="h-6 w-6 text-white" />
					</button>
				</div>
			</Wrapper>
		</div>
	)
}

export default Success
