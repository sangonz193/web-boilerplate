import { ComponentProps, ShorthandProps } from "@fluentui/react-utilities"
import React from "react"

import { PropsToState } from "../../_utils/PropsToState"

export type AppShorthandProps = {
	learnReact?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>
	header?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>
	headerContent?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>
	headerContentCode?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>
}

export type AppProps = ComponentProps & React.HTMLAttributes<HTMLElement> & AppShorthandProps

export type AppDefaults = Required<Pick<AppProps, "as" | keyof AppShorthandProps>> & {
	ref: React.Ref<HTMLElement>
}

export type AppState = PropsToState<AppProps & AppDefaults, keyof AppShorthandProps>
