import { RefObject, useEffect } from 'react'
import useEventListener from './useEventListener'

export default function useClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: () => any) {
	useEffect(() => {
		const listener = (event: any) => {
			// Do nothing if clicking ref's element or descendent elements
			if (!ref.current || ref.current.contains(event.target)) {
				return
			}
			handler()
		}
		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)
		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}
