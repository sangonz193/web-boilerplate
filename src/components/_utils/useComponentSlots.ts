import React from "react"

import { SlotsProp } from "./SlotsProp"

export function useComponentSlots<TSlots>(slots: Partial<SlotsProp<TSlots>>): SlotsProp<TSlots> {
	return React.useMemo(() => {
		return slots
	}, [Object.values(slots)])
}
