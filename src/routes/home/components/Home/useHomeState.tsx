import React from "react"

import { useContentSlot } from "../../../../components/_utils/useContentSlot"
import { usePartialPropsSlot } from "../../../../components/_utils/usePartialPropsSlot"
import { HeaderProps, HeaderSlots } from "../../../../components/Header"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { HomeProps, HomeState } from "./Home.types"

export function useHomeState(props: HomeProps): HomeState {
	const headerTitleSlot = useContentSlot<HeaderSlots["title"]>("Home")
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
