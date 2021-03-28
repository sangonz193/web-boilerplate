import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { AppSlots, AppState } from "./App.types"

export function useAppSlots(state: AppState): Slots<AppSlots> {
	return useSlotsProp<AppSlots>(state.slotProp, {
		wrapper: {
			component: "div",
			props: {
				children: "App",
			},
		},
	})
}
