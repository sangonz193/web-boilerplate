import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { Header } from "../Header"
import { Navbar } from "../Navbar"
import { LayoutSlots, LayoutState, LayoutStyles } from "./Layout.types"

export function useLayoutSlots(state: LayoutState, styles: LayoutStyles): Slots<LayoutSlots> {
	return useSlotsProp<LayoutSlots>(state.slotProp, {
		wrapper: {
			component: "div",
			props: {
				className: styles.wrapper,
			},
		},

		header: {
			component: Header,
			props: {
				slots: {
					title: {
						type: "content",
						content: "Layout title",
					},
				},
			},
		},

		navbar: {
			component: Navbar,
			props: {},
		},
	})
}
