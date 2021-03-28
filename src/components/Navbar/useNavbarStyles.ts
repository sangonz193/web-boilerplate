import { IStyle, makeStyles } from "@fluentui/react"

import { NavbarState, NavbarStyles } from "./Navbar.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles<{ [K in keyof NavbarStyles]: IStyle }>((theme) => {
	return {
		focusTrap: {},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useNavbarStyles(state: NavbarState): NavbarStyles {
	const styles = useStyles()

	return {
		focusTrap: styles.focusTrap,
	}
}
