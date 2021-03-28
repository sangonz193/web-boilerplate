import React from "react"

import { useComponentSlots } from "../../../../components/_utils/useComponentSlots"
import { useContentSlot } from "../../../../components/_utils/useContentSlot"
import { usePartialPropsSlot } from "../../../../components/_utils/usePartialPropsSlot"
import { HeaderProps, HeaderSlots } from "../../../../components/Header"
import { LayoutSlots } from "../../../../components/Layout"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { HomeProps, HomeState } from "./Home.types"

export function useHomeState(props: HomeProps): HomeState {
	const layoutSlots = useComponentSlots<LayoutSlots>({
		header: usePartialPropsSlot<HeaderProps>({
			slots: useComponentSlots<HeaderSlots>({
				title: useContentSlot<HeaderSlots["title"]>("Header"),
			}),
		}),
	})

	useLayoutOptions(
		React.useCallback(
			() => ({
				slots: layoutSlots,
			}),
			[layoutSlots]
		)
	)

	return {
		slotProp: props.slots ?? {},
		children: props.children,
	}
}
