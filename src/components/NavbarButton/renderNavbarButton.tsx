import { Slots } from "../_utils/Slots"
import { NavbarButtonSlots, NavbarButtonState } from "./NavbarButton.types"

export function renderNavbarButton(state: NavbarButtonState, slots: Slots<NavbarButtonSlots>) {
	return (
		<slots.wrapper>
			{state.active && <slots.activeIndicator />}
			<slots.icon />
		</slots.wrapper>
	)
}
