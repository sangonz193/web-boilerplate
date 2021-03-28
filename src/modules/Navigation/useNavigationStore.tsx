import React from "react"

import { NavigationContext } from "./Navigation.context"

export const useNavigationStore = () => React.useContext(NavigationContext)
