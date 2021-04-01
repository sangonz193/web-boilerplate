import React from "react"

import { RootEventListenersContext } from "./RootEventListeners.context"

export const useRootEventListenersStore = () => React.useContext(RootEventListenersContext)
