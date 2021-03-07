import { ax, makeStyles } from "@fluentui/react-make-styles"

import { AppState } from "./App.types"

const useRootStyles = makeStyles<AppState>([
	[
		null,
		() => ({
			// TODO: Add default styles
		}),
	],
])

export const useAppStyles = (state: AppState): AppState => {
	state.className = ax(useRootStyles(state), state.className)

	return state
}
