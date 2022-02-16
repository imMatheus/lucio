import React from 'react'
import { useToast, ToastType } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'
import Wrapper from './Wrapper'
import Text from './Text'
import { AlertCircle, X } from 'react-feather'

const Warning: React.FC = () => {
	const { toast, setToast } = useToast()

	return (
		<div className="sticky top-0 z-50 bg-amber-600">
			<Wrapper>
				<div className="flex w-0 flex-1 items-center">
					<span className="flex rounded-lg bg-amber-800 p-2">
						<AlertCircle className="h-6 w-6 text-white" />
					</span>
					<Text smallText="We announced a new product!">{toast.message}</Text>
				</div>
				<div className="order-3 mt-2 hidden w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto md:block">
					<a
						href="#"
						className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-amber-600 shadow-sm hover:bg-amber-50"
					>
						Learn more
					</a>
				</div>
				<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
					<button
						type="button"
						onClick={() => setToast({ message: 'Successfully created class', type: 'success' })}
						className="-mr-1 flex rounded-md p-2 transition-colors hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
					>
						<span className="sr-only">Dismiss</span>
						<X className="h-6 w-6 text-white" />
					</button>
				</div>
			</Wrapper>
		</div>
	)
}

export default Warning
