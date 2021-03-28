import { createComponent } from "../_utils/createComponent"
import { NavbarButtonProps, NavbarButtonSlots, NavbarButtonState, NavbarButtonStyles } from "./NavbarButton.types"
import { renderNavbarButton } from "./renderNavbarButton"
import { useNavbarButtonSlots } from "./useNavbarButtonSlots"
import { useNavbarButtonState } from "./useNavbarButtonState"
import { useNavbarButtonStyles } from "./useNavbarButtonStyles"

export const NavbarButton = createComponent<
	NavbarButtonProps,
	NavbarButtonState,
	NavbarButtonSlots,
	NavbarButtonStyles
>({
	name: "NavbarButton",
	useState: useNavbarButtonState,
	useStyles: useNavbarButtonStyles,
	useSlots: useNavbarButtonSlots,
	render: renderNavbarButton,
})
