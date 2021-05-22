import { IsFocusVisibleClassName } from "@fluentui/react/lib/Utilities"
import React from "react"
import { observe } from "selector-observer"

import { useIsFocused } from "../../hooks/useIsFocused"
import { useRootEventListener } from "../RootEventListeners"
import { useAppStore } from "./useAppStore"

export const AppManager: React.FC = () => {
	const store = useAppStore()

	const [focused, focusBindings] = useIsFocused({
		defaultFocused: store.isFocused(),
	})

	React.useEffect(() => {
		store.isFocused(focused)
	}, [focused])

	useRootEventListener("onFocus", focusBindings.onFocus)
	useRootEventListener("onBlur", focusBindings.onBlur)

	const isTouchTimeoutRef = React.useRef<NodeJS.Timeout>()
	const isTouchRef = React.useRef<boolean>()
	React.useEffect(() => {
		if (store.inputType() === "POINTER" && "ontouchstart" in window) {
			store.inputType("TOUCH")
		}

		const handleTouchStart = () => {
			if (isTouchTimeoutRef.current) {
				clearTimeout(isTouchTimeoutRef.current)
			}
			isTouchRef.current = true

			store.inputType("TOUCH")

			isTouchTimeoutRef.current = setTimeout(() => (isTouchRef.current = false), 500)
		}

		const handleMouseOver = () => {
			if (isTouchRef.current) {
				return
			}

			store.inputType("POINTER")
		}

		window.addEventListener("touchstart", handleTouchStart)
		window.addEventListener("mouseover", handleMouseOver)

		return () => {
			window.removeEventListener("touchstart", handleTouchStart)
			window.removeEventListener("mouseover", handleMouseOver)
		}
	}, [])

	React.useEffect(() => {
		return observe(`body.${IsFocusVisibleClassName}`, {
			add() {
				store.isFocusVisible(true)
			},
			remove() {
				store.isFocusVisible(false)
			},
		}).abort
	}, [])

	return null
}
