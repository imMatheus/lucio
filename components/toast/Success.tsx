import React from 'react'
import { useToast, ToastType } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'
import Wrapper from './Wrapper'
import Text from './Text'
import { Check, X } from 'react-feather'

const Success: React.FC = () => {
	const { toast, setToast } = useToast()

	return (
		<div className="bg-green-600 sticky top-0 z-50">
			<Wrapper>
				<div className="w-0 flex-1 flex items-center">
					<span className="flex p-2 rounded-lg bg-green-800">
						<Check className="w-6 h-6 text-white" />
					</span>
					<Text smallText="We announced a new product!">{toast.message}</Text>
				</div>
				<div className="hidden md:block order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
					<a
						href="#"
						className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50"
					>
						Learn more
					</a>
				</div>
				<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
					<button
						type="button"
						onClick={() => setToast({ message: '', type: 'success' })}
						className="-mr-1 flex p-2 rounded-md transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
					>
						<span className="sr-only">Dismiss</span>
						<X className="w-6 h-6 text-white" />
					</button>
				</div>
			</Wrapper>
		</div>
	)
}

export default Success