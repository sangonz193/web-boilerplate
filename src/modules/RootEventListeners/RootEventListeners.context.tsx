import React from "react"

import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"
import { RootEventListenersStore } from "./RootEventListeners.store"

export const RootEventListenersContext = React.createContext(null as unknown as RootEventListenersStore)

export const RootEventListenersProvider: React.FC = ({ children }) => {
	const store = useRefWithInitializer(() => new RootEventListenersStore()).current

	return <RootEventListenersContext.Provider value={store}>{children}</RootEventListenersContext.Provider>
}
