import { Slots } from "../_utils/Slots"
import { useContentSlot } from "../_utils/useContentSlot"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { Header, HeaderSlots } from "../Header"
import { Navbar } from "../Navbar"
import { LayoutSlots, LayoutState, LayoutStyles } from "./Layout.types"

export function useLayoutSlots(state: LayoutState, styles: LayoutStyles): Slots<LayoutSlots> {
	const layoutTitleSlot = useContentSlot<HeaderSlots["title"]>("Layout title")

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
					title: layoutTitleSlot,
				},
			},
		},

		navbar: {
			component: Navbar,
			props: {},
		},

		componentContainer: {
			component: "div",
			props: {
				className: styles.componentContainer,
				children: state.children,
			},
		},

		contentAndHeaderContainer: {
			component: "div",
			props: {
				className: styles.contentAndHeaderContainer,
			},
		},
	})
}
