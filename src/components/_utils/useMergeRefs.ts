import React from "react"

export const useMergeRefs = <TValue>(
	...refs: Array<React.MutableRefObject<TValue> | React.Ref<TValue>>
): React.RefCallback<TValue> => {
	return React.useCallback(
		(value) => {
			refs.forEach((ref) => {
				if (typeof ref === "function") {
					ref(value)
				} else if (ref !== null) {
					;(ref as React.MutableRefObject<TValue | null>).current = value
				}
			})
		},
		[...refs]
	)
}
