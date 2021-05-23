import React from "react"

import { useReactiveVars } from "../../hooks/useReactiveVars"
import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"
import { initialBlockerId, InitializationStore } from "./Initialization.store"

export const InitializationContext = React.createContext<InitializationStore>(null as unknown as InitializationStore)

const initStore = () => new InitializationStore()

export const InitializationProvider: React.FC = ({ children }) => {
	const store = useRefWithInitializer(initStore).current
	const { childrenKey } = useReactiveVars(store, ["childrenKey"])

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			store.unblock(initialBlockerId)
		})

		return () => {
			clearTimeout(timeout)
		}
	}, [])

	return (
		<InitializationContext.Provider key={childrenKey.toString()} value={store}>
			{children}
		</InitializationContext.Provider>
	)
}
