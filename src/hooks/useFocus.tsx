import { DependencyList, useCallback, useRef } from "react"

export type UseFocusProps = {
	defaultFocus?: boolean
	onFocus: () => void
	onBlur: () => void
}

export type UseFocusOutput = {
	handleFocus: () => void
	handleBlur: () => void
}

export const useFocus = (props: UseFocusProps, deps: DependencyList): UseFocusOutput => {
	const lastIsFocusRef = useRef(props.defaultFocus)
	const handleChangeTimeout = useRef<number | undefined>()

	const handleChange = async (type: "focus" | "blur") => {
		clearTimeout(handleChangeTimeout.current)

		handleChangeTimeout.current = window.setTimeout(() => {
			if (lastIsFocusRef.current === (type === "focus")) {
				return
			}

			if (type === "focus") {
				lastIsFocusRef.current = true
				props.onFocus()
			} else if (type === "blur") {
				lastIsFocusRef.current = false
				props.onBlur()
			}
		}, 10)
	}

	const handleFocus = useCallback(() => {
		handleChange("focus")
	}, [...deps])

	const handleBlur = useCallback(() => {
		handleChange("blur")
	}, [...deps])

	return { handleFocus, handleBlur }
}
