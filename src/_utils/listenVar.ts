import { ReactiveVar } from "@apollo/client"

export const listenVar = <T>(reactiveVar: ReactiveVar<T>, listener: (newValue: T) => void): (() => void) => {
	let removeListener: () => void

	const registerNextListener = () => {
		removeListener = reactiveVar.onNextChange((newValue) => {
			listener(newValue)
			registerNextListener()
		})
	}
	registerNextListener()

	return () => {
		removeListener()
	}
}
