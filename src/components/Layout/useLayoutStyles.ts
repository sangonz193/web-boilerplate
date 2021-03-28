import { css, makeStyles } from "@fluentui/react"
import { useMediaQuery } from "react-responsive"

import { Breakpoint } from "../../styles/Breakpoint"
import { LayoutState, LayoutStyles } from "./Layout.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},

		wrapperMd: {
			flexDirection: "row-reverse",
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
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	console.log(css(styles.wrapper, isMd && styles.wrapperMd))

	return {
		wrapper: css(styles.wrapper, isMd && styles.wrapperMd),
		contentAndHeaderContainer: styles.contentAndHeaderContainer,
		componentContainer: styles.componentContainer,
	}
}
