import { Slots } from "../../../../components/_utils/Slots"
import { useSlotsProp } from "../../../../components/_utils/useSlotsProp"
import { HomeSlots, HomeState, HomeStyles } from "./Home.types"

export function useHomeSlots(state: HomeState, styles: HomeStyles): Slots<HomeSlots> {
	return useSlotsProp<HomeSlots>(state.slotProp, {
		wrapper: {
			component: "div",
			props: {
				className: styles.wrapper,
				children: "This is the home screen.",
			},
		},
	})
}
