import { Slots } from "../_utils/Slots"
import { HeaderSlots, HeaderState } from "./Header.types"

export function renderHeader(state: HeaderState, slots: Slots<HeaderSlots>) {
	return (
		<slots.wrapper>
			<slots.title />
			<slots.right />
		</slots.wrapper>
	)
}
