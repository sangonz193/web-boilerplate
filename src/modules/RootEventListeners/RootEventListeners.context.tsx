import React from "react"

import { RootEventListenersStore } from "./RootEventListeners.store"

export const RootEventListenersContext = React.createContext((null as unknown) as RootEventListenersStore)

export const RootEventListenersProvider: React.FC = ({ children }) => {
	const [store] = React.useState(() => new RootEventListenersStore())

	return <RootEventListenersContext.Provider value={store}>{children}</RootEventListenersContext.Provider>
}
