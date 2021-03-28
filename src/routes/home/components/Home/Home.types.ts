import React from "react"

import { SlotsProp } from "../../../../components/_utils/SlotsProp"

export type HomeSlots = {
	wrapper: React.HTMLAttributes<HTMLDivElement>
}

export type HomeProps = {
	children?: React.ReactNode
	slots?: SlotsProp<HomeSlots>
}

export type HomeState = {
	slotProp: SlotsProp<HomeSlots>
	children: React.ReactNode
}

export type HomeStyles = {
	wrapper: string
}
