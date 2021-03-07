import { getSlots } from "@fluentui/react-utilities"
import React from "react"

export const getSlotsWithProps = <T extends Record<string, any>, TKey extends keyof T>(
	state: T,
	slotNames: TKey[]
): Record<TKey | "root", React.FC> => {
	const { slots, slotProps } = getSlots(state, slotNames as any)

	const slotPropsRef = React.useRef(slotProps)
	slotPropsRef.current = slotProps

	const lastSlotsRef = React.useRef<typeof slots>({})
	const slotsWithPropsRef = React.useRef<typeof slots>({})

	Object.keys(slots).forEach((slotKey) => {
		const lastSlots = lastSlotsRef.current
		const Slot = slots[slotKey]

		if (Slot !== lastSlots[slotKey]) {
			const SlotWithProps: React.FC = (props: any) => <Slot {...slotPropsRef.current[slotKey]} {...props} />
			SlotWithProps.displayName = `slots.${slotKey}`

			slotsWithPropsRef.current[slotKey] = SlotWithProps
			lastSlots[slotKey] = Slot
		}
	})

	return slotsWithPropsRef.current as any
}
