import React from "react"

import { RootEventListenersContext } from "./RootEventListeners.context"
import { EventsMap } from "./RootEventListeners.store"

export const useRootEventListener = <TEvent extends keyof EventsMap>(
	event: TEvent,
	listener: EventsMap[TEvent],
	skip: boolean = false
) => {
	const store = React.useContext(RootEventListenersContext)

	React.useEffect(() => {
		if (skip) {
			return
		}

		store.addListener(event, listener)

		return () => store.removeListener(event, listener)
	}, [skip, event, listener])
}
