import React from "react"

import { RouteConfig } from "../../routes/_utils/RouteConfig"
import { SlotsProp } from "../_utils/SlotsProp"
import { LayoutProps } from "../Layout"

export type AppSlots = {
	wrapper: LayoutProps
}

export type AppProps = {
	children?: React.ReactNode
	slots?: SlotsProp<AppSlots>
}

export type AppState = {
	slotProp: SlotsProp<AppSlots>
	routeConfig: RouteConfig<any> | undefined
	routeParams: object | undefined
}

export type AppStyles = {
	wrapper: string
}
