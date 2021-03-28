import { IStyle, makeStyles } from "@fluentui/react"

import { LayoutState, LayoutStyles } from "./Layout.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles<{ [K in keyof LayoutStyles]: IStyle }>((theme) => {
	return {
		wrapper: {
			height: "100%",
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLayoutStyles(state: LayoutState): LayoutStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
