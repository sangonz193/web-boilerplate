import React from "react"

import { AppStore } from "./App.store"

export const AppContext = React.createContext<AppStore>(null as unknown as AppStore)

const initStore = () => new AppStore()

export const AppProvider: React.FC = ({ children }) => (
	<AppContext.Provider value={React.useState(initStore)[0]}>{children}</AppContext.Provider>
)
