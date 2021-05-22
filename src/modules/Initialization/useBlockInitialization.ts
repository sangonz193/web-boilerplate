import React from "react"

import { useInitializationStore } from "./useInitializationStore"

export const useBlockInitialization = () => {
	const store = useInitializationStore()

	React.useState(() => {
		store.block()
	})

	return React.useCallback(() => store.unblock(), [])
}
