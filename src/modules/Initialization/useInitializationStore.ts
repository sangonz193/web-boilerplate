import React from "react"

import { InitializationContext } from "./Initialization.context"

export const useInitializationStore = () => React.useContext(InitializationContext)
