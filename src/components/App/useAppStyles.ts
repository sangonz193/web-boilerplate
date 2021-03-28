import { makeStyles } from "@fluentui/react"

import { AppState, AppStyles } from "./App.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useAppStyles(state: AppState): AppStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
