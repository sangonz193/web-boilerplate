import React from "react"

import { SlotProp } from "./SlotProp"

export function useContentSlot<TSlotProps>(
	content: "children" extends keyof TSlotProps ? TSlotProps["children"] : never
): SlotProp<TSlotProps> {
	return React.useMemo(() => {
		return {
			type: "content",
			content,
		}
	}, [content])
}
