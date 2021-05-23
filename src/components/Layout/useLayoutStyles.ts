import { css, makeStyles } from "@fluentui/react"
import { useMediaQuery } from "react-responsive"

import { Breakpoint } from "../../styles/Breakpoint"

export type LayoutStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			height: "100%",
		},

		wrapperWithRowReverse: {
			flexDirection: "row-reverse",
		},

		contentAndHeaderContainer: {
			flex: "1 1 auto",
			height: "100%",
		},

		componentContainer: {
			flex: "1 1 100%",
			backgroundColor: theme.semanticColors.bodyBackground,
		},
	}
})

export function useLayoutStyles(props: LayoutStyleProps) {
	const styles = useStyles()
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	return {
		wrapper: css(styles.wrapper, isMd && styles.wrapperWithRowReverse, props.className),
		contentAndHeaderContainer: styles.contentAndHeaderContainer,
		componentContainer: styles.componentContainer,
	}
}
