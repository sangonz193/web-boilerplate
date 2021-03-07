import { getSlotsWithProps } from "../../_utils/getSlotsWithProps"
import { AppState } from "./App.types"
import { appShorthandProps } from "./useApp"

export const renderApp = (state: AppState) => {
	const slots = getSlotsWithProps(state, appShorthandProps)

	return (
		<slots.root>
			<slots.header>
				<slots.headerContent>
					<slots.headerContentCode />
				</slots.headerContent>
			</slots.header>

			<slots.learnReact />
		</slots.root>
	)
}
