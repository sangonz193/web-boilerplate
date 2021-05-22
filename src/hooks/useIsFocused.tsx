import throttle from "lodash/throttle"
import React from "react"

import { useRefWithInitializer } from "./useRefWithInitializer"

export type UseIsFocusedProps = {
	defaultFocused?: boolean
}

export type UseIsFocusedOutput = [
	focused: boolean,
	bindings: {
		onBlur: () => void
		onFocus: () => void
	}
]

export const useIsFocused = (props: UseIsFocusedProps): UseIsFocusedOutput => {
	const { defaultFocused = false } = props
	const [focused, setFocused] = React.useState(defaultFocused)
	const lastIsFocusRef = React.useRef(focused)

	const handleChange = useRefWithInitializer(() =>
		throttle((nextFocused: boolean) => {
			if (lastIsFocusRef.current === nextFocused) {
				return
			}

			lastIsFocusRef.current = nextFocused
			setFocused(nextFocused)
			console.log(nextFocused)
		}, 10)
	).current

	return [
		focused,
		{
			onBlur: React.useCallback(() => handleChange(false), []),
			onFocus: React.useCallback(() => handleChange(true), []),
		},
	]
}
