import { IFocusZoneProps } from "@fluentui/react-focus"
import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"

export type NavbarSlots = {
	focusTrap: IFocusZoneProps
}

export type NavbarProps = {
	children?: React.ReactNode
	slots?: SlotsProp<NavbarSlots>
}

export type NavbarState = {
	slotProp: SlotsProp<NavbarSlots>
	children: React.ReactNode
	isMd: boolean
}

export type NavbarStyles = {
	focusTrap: string
}
