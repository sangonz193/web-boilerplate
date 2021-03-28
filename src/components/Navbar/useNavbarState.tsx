import { useMediaQuery } from "react-responsive"

import { Breakpoint } from "../../styles/Breakpoint"
import { NavbarProps, NavbarState } from "./Navbar.types"

export function useNavbarState(props: NavbarProps): NavbarState {
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })

	return {
		slotProp: props.slots ?? {},
		children: props.children,
		isMd,
	}
}
