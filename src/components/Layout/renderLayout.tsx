import { Slots } from "../_utils/Slots"
import { LayoutContext } from "./Layout.context"
import { LayoutSlots, LayoutState } from "./Layout.types"

export function renderLayout(state: LayoutState, slots: Slots<LayoutSlots>) {
	return (
		<LayoutContext.Provider value={state.contextValue}>
			<slots.wrapper>
				<slots.header />
				{state.children}
				<slots.navbar />
			</slots.wrapper>
		</LayoutContext.Provider>
	)
}
