import { css, makeStyles } from "@fluentui/react"
import { useMediaQuery } from "react-responsive"

import { Breakpoint } from "../../styles/Breakpoint"
import { NavbarState, NavbarStyles } from "./Navbar.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		focusTrap: {
			minWidth: 50,
			minHeight: 50,
			borderTop: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.palette.neutralLighterAlt,
		},

		focusTrapMd: {
			borderTop: "none",
			borderRight: `1px solid ${theme.semanticColors.bodyDivider}`,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useNavbarStyles(state: NavbarState): NavbarStyles {
	const styles = useStyles()
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	return {
		focusTrap: css(styles.focusTrap, isMd && styles.focusTrapMd),
	}
}
