import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"

export type AppSlots = {
	wrapper: React.HTMLAttributes<HTMLDivElement>
}

export type AppProps = {
	children?: React.ReactNode
	slots?: SlotsProp<AppSlots>
}

export type AppState = {
	slotProp: SlotsProp<AppSlots>
}

export type AppStyles = {
	wrapper: string
}
