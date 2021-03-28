import { css, makeStyles } from "@fluentui/react"

import { getMinWidthSelector } from "../../styles/getMinWidthSelector"
import { NavbarState, NavbarStyles } from "./Navbar.types"

const useStyles = makeStyles((theme) => {
	return {
		focusZone: {
			display: "flex",
			flexShrink: 0,

			borderTop: `1px solid ${theme.semanticColors.bodyDivider}`,

			backgroundColor: theme.palette.neutralLighterAlt,

			[getMinWidthSelector("md")]: {
				flexDirection: "column",

				borderTop: "none",
				borderRight: `1px solid ${theme.semanticColors.bodyDivider}`,
			},
		},

		icon: {
			fontSize: "1.3rem",
			color: theme.semanticColors.bodyText,
		},

		iconSettings: {
			marginTop: "auto",
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useNavbarStyles(state: NavbarState): NavbarStyles {
	const styles = useStyles()

	return {
		focusZone: styles.focusZone,
		home: styles.icon,
		settings: css(styles.icon, styles.iconSettings),
	}
}
