import React from "react"

import { AppContext } from "./App.context"

export const useAppStore = () => React.useContext(AppContext)
