import React from "react"

import { useInitializationStore } from "./useInitializationStore"

export const useOnReset = (listener: () => void | Promise<void>) => {
	const store = useInitializationStore()

	React.useEffect(() => {
		store.addResetListener(listener)

		return () => store.removeResetListener(listener)
	}, [listener])
}
