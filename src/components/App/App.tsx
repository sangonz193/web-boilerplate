import React from "react"

import { AppProps } from "./App.types"
import { renderApp } from "./renderApp"
import { useApp } from "./useApp"
import { useAppStyles } from "./useAppStyles"

export const App = React.memo(
	React.forwardRef<HTMLElement, AppProps>((props, ref) => {
		const state = useApp(props, ref)

		useAppStyles(state)
		return renderApp(state)
	})
)

App.displayName = "App"
