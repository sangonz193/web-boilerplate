import { createHashHistory, History } from "history"
import React from "react"

import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"

export const NavigationContext = React.createContext<History>(null as unknown as History)

export const NavigationProvider: React.FC = ({ children }) => {
	const history = useRefWithInitializer(() => createHashHistory()).current

	return <NavigationContext.Provider value={history}>{children}</NavigationContext.Provider>
}
