import React from "react"

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
	const { defaultFocused } = props
	const [focused, setFocused] = React.useState(defaultFocused ?? false)
	const lastIsFocusRef = React.useRef(focused)
	const handleChangeTimeout = React.useRef<number | undefined>()

	const handleChange = async (type: "focus" | "blur") => {
		clearTimeout(handleChangeTimeout.current)

		handleChangeTimeout.current = window.setTimeout(() => {
			if (lastIsFocusRef.current === (type === "focus")) {
				return
			}

			if (type === "focus") {
				lastIsFocusRef.current = true
				setFocused(true)
			} else if (type === "blur") {
				lastIsFocusRef.current = false
				setFocused(false)
			}
		}, 10)
	}

	return [
		focused,
		{
			onBlur: React.useCallback(() => handleChange("blur"), []),
			onFocus: React.useCallback(() => handleChange("focus"), []),
		},
	]
}
