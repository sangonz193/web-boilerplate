import { Text } from "@fluentui/react"

import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { HeaderSlots, HeaderState, HeaderStyles } from "./Header.types"

const TextH1 = Text.bind({})
TextH1.defaultProps = {
	...TextH1.defaultProps,
	as: "h1",
}

export function useHeaderSlots(state: HeaderState, styles: HeaderStyles): Slots<HeaderSlots> {
	return useSlotsProp<HeaderSlots>(state.slotProp, {
		wrapper: {
			component: "div",
			props: {
				className: styles.wrapper,
			},
		},

		title: {
			component: TextH1,
			props: {
				className: styles.title,
				children: "Default",
			},
		},

		right: {
			component: "span",
			props: {
				className: styles.right,
			},
		},
	})
}
