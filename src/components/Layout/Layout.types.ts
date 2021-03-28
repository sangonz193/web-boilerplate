import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"
import { HeaderProps } from "../Header"
import { NavbarProps } from "../Navbar"

export type LayoutSlots = {
	wrapper: React.HTMLAttributes<HTMLDivElement>
	header: HeaderProps
	contentAndHeaderContainer: React.HTMLAttributes<HTMLDivElement>
	componentContainer: React.HTMLAttributes<HTMLDivElement>
	navbar: NavbarProps
}

export type LayoutProps = {
	children?: React.ReactNode
	slots?: SlotsProp<LayoutSlots>
}

export type LayoutOptions = LayoutProps

export type SetLayoutOptions = Partial<LayoutOptions> | ((options: LayoutOptions) => Partial<LayoutOptions>)

export type LayoutContextValue = {
	setLayoutOptions: (setOptions: SetLayoutOptions) => void
}

export type LayoutState = {
	slotProp: SlotsProp<LayoutSlots>
	children: React.ReactNode
	contextValue: LayoutContextValue
}

export type LayoutStyles = {
	wrapper: string
	contentAndHeaderContainer: string
	componentContainer: string
}
