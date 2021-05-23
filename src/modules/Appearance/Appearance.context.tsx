import React from "react"

import type { AppearanceStore } from "./Appearance.store"
import { FluentThemeProvider } from "./FluentThemeProvider"

export type AppearanceContextValue = AppearanceStore | ((store: AppearanceStore) => void)

export const AppearanceContext = React.createContext<AppearanceContextValue>(null as unknown as AppearanceContextValue)

export const AppearanceProvider: React.FC = ({ children }) => {
	const [store, setStore] = React.useState<AppearanceStore>()

	return (
		<AppearanceContext.Provider value={store || setStore}>
			<FluentThemeProvider>{children}</FluentThemeProvider>
		</AppearanceContext.Provider>
	)
}
