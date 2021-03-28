import React from "react"

import { LayoutContextValue } from "./Layout.types"

export const LayoutContext = React.createContext<LayoutContextValue>((undefined as unknown) as LayoutContextValue)
