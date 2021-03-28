import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { Layout } from "../Layout"
import { AppSlots, AppState } from "./App.types"

export function useAppSlots(state: AppState): Slots<AppSlots> {
	return useSlotsProp<AppSlots>(state.slotProp, {
		wrapper: {
			component: Layout,
			props: {},
		},
	})
}
