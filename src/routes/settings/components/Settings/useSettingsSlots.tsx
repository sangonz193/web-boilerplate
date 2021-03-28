import { Slots } from "../../../../components/_utils/Slots"
import { useSlotsProp } from "../../../../components/_utils/useSlotsProp"
import { SettingsSlots, SettingsState, SettingsStyles } from "./Settings.types"

export function useSettingsSlots(state: SettingsState, styles: SettingsStyles): Slots<SettingsSlots> {
	return useSlotsProp<SettingsSlots>(state.slotProp, {
		wrapper: {
			component: "div",
			props: {
				className: styles.wrapper,
				children: "This is the settings page.",
			},
		},
	})
}
