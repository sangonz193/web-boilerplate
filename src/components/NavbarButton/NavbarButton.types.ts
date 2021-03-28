import { IFontIconProps, ILinkProps } from "@fluentui/react"
import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"

export type NavbarButtonSlots = {
	wrapper: ILinkProps
	activeIndicator: React.HTMLAttributes<HTMLDivElement>
	icon: IFontIconProps
}

export type NavbarButtonProps = {
	children?: React.ReactNode
	slots?: SlotsProp<NavbarButtonSlots>

	route: string
	routeName: string
	exact?: boolean
}

export type NavbarButtonState = {
	props: NavbarButtonProps
	slotProp: SlotsProp<NavbarButtonSlots>
	children: React.ReactNode
	active: boolean
	isHover: boolean
	isHoverBindings: Record<
		keyof Pick<
			Required<React.ButtonHTMLAttributes<HTMLButtonElement>>,
			"onMouseOver" | "onMouseLeave" | "onMouseMove"
		>,
		() => void
	>
}

export type NavbarButtonStyles = {
	wrapper: string
	icon: string
	activeIndicator: string
}
