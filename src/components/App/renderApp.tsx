import { Slots } from "../_utils/Slots"
import { AppSlots, AppState } from "./App.types"

export function renderApp(state: AppState, slots: Slots<AppSlots>) {
	return <slots.wrapper />
}
