import React from 'react'
import { useToast, ToastType } from '@/context/ToastContext'
import useTimeout from '@/hooks/useTimeout'
import Wrapper from './Wrapper'
import Text from './Text'
import { AlertTriangle, X } from 'react-feather'

const Info: React.FC = () => {
	const { toast, setToast } = useToast()

	return (
		<div className="bg-theme-600 sticky top-0 z-50">
			<Wrapper>
				<div className="w-0 flex-1 flex items-center">
					<span className="flex p-2 rounded-lg bg-theme-800">
						<svg
							className="h-6 w-6 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
							/>
						</svg>
					</span>
					<Text smallText="We announced a new product!">{toast.message}</Text>
				</div>
				<div className="hidden md:block order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
					<a
						href="#"
						className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-theme-600 bg-white hover:bg-theme-50"
					>
						Learn more
					</a>
				</div>
				<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
					<button
						type="button"
						onClick={() => setToast({ message: 'Could not create class, please try again', type: 'error' })}
						className="-mr-1 flex p-2 rounded-md transition-colors hover:bg-theme-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
					>
						<span className="sr-only">Dismiss</span>
						<X className="w-6 h-6 text-white" />
					</button>
				</div>
			</Wrapper>
		</div>
	)
}

export default Info
