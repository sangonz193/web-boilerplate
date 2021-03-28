import { createBrowserHistory, History } from "history"
import React from "react"

import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"

export const NavigationContext = React.createContext<History>((null as unknown) as History)

export const NavigationProvider: React.FC = ({ children }) => {
	const history = useRefWithInitializer(() => {
		return createBrowserHistory()
	}).current

	return <NavigationContext.Provider value={history}>{children}</NavigationContext.Provider>
}
