import { Slots } from "../_utils/Slots"
import { NavbarSlots, NavbarState } from "./Navbar.types"

export function renderNavbar(state: NavbarState, slots: Slots<NavbarSlots>) {
	return <slots.focusTrap>{state.children}</slots.focusTrap>
}
