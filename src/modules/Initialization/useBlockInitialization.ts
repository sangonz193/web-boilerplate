import React from "react"

import { useId } from "../../hooks/useId"
import { useInitializationStore } from "./useInitializationStore"

export const useBlockInitialization = () => {
	const id = useId()
	const store = useInitializationStore()

	React.useEffect(() => {
		store.block(id)
	}, [])

	return React.useCallback(() => {
		store.unblock(id)
	}, [])
}
