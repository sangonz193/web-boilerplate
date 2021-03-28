import React from "react"

import { useComponentSlots } from "../../../../components/_utils/useComponentSlots"
import { useContentSlot } from "../../../../components/_utils/useContentSlot"
import { usePartialPropsSlot } from "../../../../components/_utils/usePartialPropsSlot"
import { HeaderProps, HeaderSlots } from "../../../../components/Header"
import { LayoutSlots } from "../../../../components/Layout"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { SettingsProps, SettingsState } from "./Settings.types"

export function useSettingsState(props: SettingsProps): SettingsState {
	const layoutSlots = useComponentSlots<LayoutSlots>({
		header: usePartialPropsSlot<HeaderProps>({
			slots: useComponentSlots<HeaderSlots>({
				title: useContentSlot<HeaderSlots["title"]>("Settings"),
			}),
		}),
	})

	useLayoutOptions(
		React.useCallback(() => {
			return {
				slots: layoutSlots,
			}
		}, [layoutSlots])
	)

	return {
		slotProp: props.slots ?? {},
		children: props.children,
	}
}
