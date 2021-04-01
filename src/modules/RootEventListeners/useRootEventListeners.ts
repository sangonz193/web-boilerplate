import { useReactiveVar } from "@apollo/client"

import { useRootEventListenersStore } from "./useRootEventListenersStore"

export const useRootEventListeners = () => {
	const store = useRootEventListenersStore()
	return useReactiveVar(store.listeners)
}
