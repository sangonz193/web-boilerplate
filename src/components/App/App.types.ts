import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"
import { LayoutProps } from "../Layout"

export type AppSlots = {
	wrapper: LayoutProps
}

export type AppProps = {
	children?: React.ReactNode
	slots?: SlotsProp<AppSlots>
}

export type AppState = {
	slotProp: SlotsProp<AppSlots>
	children: React.ReactNode
}

export type AppStyles = {
	wrapper: string
}
