import { makeStyles } from "@fluentui/react"

import { HeaderState, HeaderStyles } from "./Header.types"

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			height: 50,
			flexShrink: 0,

			borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.palette.neutralLighterAlt,

			zIndex: 1,
		},

		title: [
			theme.fonts.xLarge,
			{
				marginRight: "auto",
				alignSelf: "center",
				padding: "0 20px",
				whiteSpace: "nowrap",
				display: "block",
				overflow: "hidden",
				textOverflow: "ellipsis",

				color: theme.semanticColors.bodyText,
			},
		],

		right: {},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useHeaderStyles(state: HeaderState): HeaderStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		title: styles.title,
		right: styles.right,
	}
}
