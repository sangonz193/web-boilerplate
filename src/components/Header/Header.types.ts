import { ITextProps } from "@fluentui/react"
import React from "react"

import { SlotsProp } from "../_utils/SlotsProp"

export type HeaderSlots = {
	wrapper: React.HTMLAttributes<HTMLDivElement>
	title: ITextProps
	right: React.HTMLAttributes<HTMLSpanElement>
}

export type HeaderProps = {
	children?: React.ReactNode
	slots?: SlotsProp<HeaderSlots>
}

export type HeaderState = {
	slotProp: SlotsProp<HeaderSlots>
}

export type HeaderStyles = {
	wrapper: string
	title: string
	right: string
}
