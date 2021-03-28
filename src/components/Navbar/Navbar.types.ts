import { IFocusZoneProps } from "@fluentui/react-focus"
import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"
import { NavbarButtonProps } from "../NavbarButton"

export type NavbarSlots = {
	focusZone: IFocusZoneProps
	home: NavbarButtonProps
	settings: NavbarButtonProps
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
	focusZone: string
	home: string
	settings: string
}
