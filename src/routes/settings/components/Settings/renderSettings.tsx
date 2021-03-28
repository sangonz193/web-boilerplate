import { Slots } from "../../../../components/_utils/Slots"
import { SettingsSlots, SettingsState } from "./Settings.types"

export function renderSettings(state: SettingsState, slots: Slots<SettingsSlots>) {
	return <slots.wrapper />
}
