import { createComponent } from "../_utils/createComponent"
import { AppProps, AppSlots, AppState, AppStyles } from "./App.types"
import { renderApp } from "./renderApp"
import { useAppSlots } from "./useAppSlots"
import { useAppState } from "./useAppState"
import { useAppStyles } from "./useAppStyles"

export const App = createComponent<AppProps, AppState, AppSlots, AppStyles>({
	name: "App",
	useState: useAppState,
	useStyles: useAppStyles,
	useSlots: useAppSlots,
	render: renderApp,
})
