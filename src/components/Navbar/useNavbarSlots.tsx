import { FocusZone, FocusZoneDirection } from "@fluentui/react-focus"

import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { NavbarSlots, NavbarState, NavbarStyles } from "./Navbar.types"

export function useNavbarSlots(state: NavbarState, styles: NavbarStyles): Slots<NavbarSlots> {
	const { isMd } = state

	return useSlotsProp<NavbarSlots>(state.slotProp, {
		focusTrap: {
			component: FocusZone,
			props: {
				className: styles.focusTrap,
				direction: isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
			},
		},
	})
}
