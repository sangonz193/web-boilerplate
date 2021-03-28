import { makeStyles } from "@fluentui/react"

import { HomeState, HomeStyles } from "./Home.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flexGrow: 1,
			padding: 20,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useHomeStyles(state: HomeState): HomeStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
