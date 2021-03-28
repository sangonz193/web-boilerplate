import React from "react"

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf"
import { useRefWithInitializer } from "../../hooks/useRefWithInitializer"
import { mergeSlotProp } from "./mergeSlotProp"
import { Slots } from "./Slots"
import { SlotsProp } from "./SlotsProp"

export const useSlotsProp = <TSlots>(
	slotsProp: SlotsProp<TSlots>,
	defaults: {
		[TSlotKey in keyof TSlots]: {
			component: React.ComponentType<TSlots[TSlotKey]> | keyof JSX.IntrinsicElements
			props: TSlots[TSlotKey]
		}
	}
): Slots<TSlots> => {
	const slotKeys = useRefWithInitializer(() => dangerousKeysOf(defaults)).current
	const paramsRef = React.useRef([slotsProp, defaults] as const)

	return useRefWithInitializer(
		() =>
			slotKeys.reduce((result, key) => {
				result[key] = (props) => {
					const [slotsProp, defaults] = paramsRef.current

					const { component: Component, props: defaultProps } = defaults[key]
					const mergedSlotProp = mergeSlotProp<TSlots[typeof key]>([slotsProp[key] ?? []])

					const result = mergedSlotProp(
						{
							...defaultProps,
							...props,
						},
						(props) => {
							return React.createElement(Component, props, (props as any).children)
						}
					)

					return result as any
				}
				return result
			}, {} as { [TSlotKey in keyof TSlots]: React.FC })
		// TODO: check any
	).current as any
}
