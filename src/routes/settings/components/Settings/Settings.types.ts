import React from "react"

import { SlotsProp } from "../../../../components/_utils/SlotsProp"

export type SettingsSlots = {
	wrapper: React.HTMLAttributes<HTMLDivElement>
}

export type SettingsProps = {
	children?: React.ReactNode
	slots?: SlotsProp<SettingsSlots>
}

export type SettingsState = {
	slotProp: SlotsProp<SettingsSlots>
	children: React.ReactNode
}

export type SettingsStyles = {
	wrapper: string
}
