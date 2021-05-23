import { useReactiveVar } from "@apollo/client"

import { useInitializationStore } from "./useInitializationStore"

export const useIsInitializing = () => {
	const store = useInitializationStore()
	return useReactiveVar(store.initializing)
}
