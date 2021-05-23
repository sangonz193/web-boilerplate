import React from "react"

export const useRefWithInitializer = <T>(initializer: () => T): React.MutableRefObject<T> => {
	const initializedRef = React.useRef(false)

	const initialValue = !initializedRef.current ? initializer() : (undefined as unknown as T)
	const ref = React.useRef(initialValue)

	return ref
}
