import { createComponent } from "../_utils/createComponent"
import { NavbarProps, NavbarSlots, NavbarState, NavbarStyles } from "./Navbar.types"
import { renderNavbar } from "./renderNavbar"
import { useNavbarSlots } from "./useNavbarSlots"
import { useNavbarState } from "./useNavbarState"
import { useNavbarStyles } from "./useNavbarStyles"

export const Navbar = createComponent<NavbarProps, NavbarState, NavbarSlots, NavbarStyles>({
	name: "Navbar",
	useState: useNavbarState,
	useStyles: useNavbarStyles,
	useSlots: useNavbarSlots,
	render: renderNavbar,
})
