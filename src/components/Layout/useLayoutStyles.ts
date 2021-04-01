import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"

export type LayoutStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			height: "100%",

			[getMinWidthSelector("md")]: {
				["&&"]: {
					flexDirection: "row-reverse",
				},
			},
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

	return {
		wrapper: css(styles.wrapper, props.className),
		contentAndHeaderContainer: styles.contentAndHeaderContainer,
		componentContainer: styles.componentContainer,
	}
}
