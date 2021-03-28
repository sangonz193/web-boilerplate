import { makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"
import { LayoutState, LayoutStyles } from "./Layout.types"

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			height: "100%",

			[getMinWidthSelector("md")]: {
				flexDirection: "row-reverse",
			},
		},

		contentAndHeaderContainer: {
			display: "flex",
			flexDirection: "column",
			flex: "1 1 auto",
			height: "100%",
		},

		componentContainer: {
			display: "flex",
			flexDirection: "column",
			flex: "1 1 100%",
			backgroundColor: theme.semanticColors.bodyBackground,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useLayoutStyles(state: LayoutState): LayoutStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		contentAndHeaderContainer: styles.contentAndHeaderContainer,
		componentContainer: styles.componentContainer,
	}
}
