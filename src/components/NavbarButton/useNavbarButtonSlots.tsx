import { FontIcon, Link } from "@fluentui/react"

import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { NavbarButtonSlots, NavbarButtonState, NavbarButtonStyles } from "./NavbarButton.types"

export function useNavbarButtonSlots(state: NavbarButtonState, styles: NavbarButtonStyles): Slots<NavbarButtonSlots> {
	return useSlotsProp<NavbarButtonSlots>(state.slotProp, {
		wrapper: {
			component: Link,
			props: {
				className: styles.wrapper,
				title: state.props.routeName,
				href: state.props.route,
			},
		},

		icon: {
			component: FontIcon,
			props: {
				className: styles.icon,
			},
		},

		activeIndicator: {
			component: "div",
			props: {
				className: styles.activeIndicator,
			},
		},
	})
}
