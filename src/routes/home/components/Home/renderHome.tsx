import { Slots } from "../../../../components/_utils/Slots"
import { HomeSlots, HomeState } from "./Home.types"

export function renderHome(state: HomeState, slots: Slots<HomeSlots>) {
	return <slots.wrapper>{state.children}</slots.wrapper>
}
