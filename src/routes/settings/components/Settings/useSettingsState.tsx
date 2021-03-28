import React from "react"

import { useContentSlot } from "../../../../components/_utils/useContentSlot"
import { usePartialPropsSlot } from "../../../../components/_utils/usePartialPropsSlot"
import { HeaderProps, HeaderSlots } from "../../../../components/Header"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { SettingsProps, SettingsState } from "./Settings.types"

export function useSettingsState(props: SettingsProps): SettingsState {
	const headerTitleSlot = useContentSlot<HeaderSlots["title"]>("Settings")
	const headerSlots = usePartialPropsSlot<HeaderProps>(
		React.useMemo(() => {
			return {
				slots: {
					title: headerTitleSlot,
				},
			}
		}, [headerTitleSlot])
	)

	useLayoutOptions(
		React.useCallback(
			() => ({
				slots: {
					header: headerSlots,
				},
			}),
			[headerSlots]
		)
	)

	return {
		slotProp: props.slots ?? {},
		children: props.children,
	}
}
