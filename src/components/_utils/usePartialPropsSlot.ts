import { merge } from "lodash"
import React from "react"

import { SlotProp } from "./SlotProp"

export function usePartialPropsSlot<TSlotProps>(partialProps: Partial<TSlotProps>): SlotProp<TSlotProps> {
	return React.useMemo(() => {
		return {
			type: "props",
			getProps: (props) => {
				return merge({}, props, partialProps)
			},
		}
	}, [partialProps])
}
