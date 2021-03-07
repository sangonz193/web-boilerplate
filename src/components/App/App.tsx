import React from "react"

import { AppProps } from "./App.types"
import { renderApp } from "./renderApp"
import { useApp } from "./useApp"
import { useAppStyles } from "./useAppStyles"

const AppComponent: React.ForwardRefRenderFunction<HTMLElement, AppProps> = (props, ref) => {
	const state = useApp(props, ref)

	useAppStyles(state)
	return renderApp(state)
}

export const App = React.memo(React.forwardRef(AppComponent))

App.displayName = "App"
