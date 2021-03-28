import React from "react"

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf"
import { identityMap } from "../../_utils/identityMap"
import { SlotsProp } from "../_utils/SlotsProp"
import { LayoutContextValue, LayoutProps, LayoutSlots, LayoutState, SetLayoutOptions } from "./Layout.types"

const layoutSlotKeys = dangerousKeysOf(
	identityMap<keyof LayoutSlots>({
		wrapper: 0,
		header: 0,
		navbar: 0,
		componentContainer: 0,
		contentAndHeaderContainer: 0,
	})
)

export function useLayoutState(props: LayoutProps): LayoutState {
	const [overriddenLayoutOptions, setOverriddenLayoutOptions] = React.useState<SetLayoutOptions>()

	const contextValue = React.useMemo<LayoutContextValue>(() => {
		return {
			setLayoutOptions: setOverriddenLayoutOptions,
		}
	}, [])

	const layoutOptionsWithOverrides = React.useMemo(() => {
		return typeof overriddenLayoutOptions === "function" ? overriddenLayoutOptions(props) : overriddenLayoutOptions
	}, [overriddenLayoutOptions, props])

	const slotsProp = props.slots
	const layoutOverridesSlotsProp = layoutOptionsWithOverrides?.slots
	const slotProp = React.useMemo<SlotsProp<LayoutSlots>>(() => {
		return layoutSlotKeys.reduce((result, key) => {
			result[key] = [
				...(slotsProp?.[key] ? [slotsProp[key]] : []),
				...(layoutOverridesSlotsProp?.[key] ? [layoutOverridesSlotsProp[key]] : []),
			] as any

			return result
		}, {} as Required<SlotsProp<LayoutSlots>>)
	}, [layoutOptionsWithOverrides, slotsProp?.wrapper, slotsProp?.header, slotsProp?.navbar])

	return {
		slotProp,
		children: props.children,
		contextValue,
	}
}
