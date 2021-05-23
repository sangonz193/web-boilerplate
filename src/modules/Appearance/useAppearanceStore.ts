import React from "react"

import { AppearanceContext } from "./Appearance.context"
import type { AppearanceStore } from "./Appearance.store"

export const useAppearanceStore = (): AppearanceStore => {
	const context = React.useContext(AppearanceContext)

	return context as Exclude<typeof context, Function>
}
