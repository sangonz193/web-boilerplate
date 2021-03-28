import React from "react"

import { Slots } from "./Slots"

export const createComponent = <TProps extends object, TState, TSlots, TStyles>(options: {
	name: string
	useState: (props: TProps) => TState
	useStyles: (state: TState) => TStyles
	useSlots: (state: TState, styles: TStyles) => Slots<TSlots>
	render: (state: TState, slots: Slots<TSlots>) => JSX.Element
}) => {
	const { name, useState, useStyles, useSlots, render } = options

	const Component = React.memo<TProps>((props) => {
		const state = useState(props)
		const style = useStyles(state)
		const slots = useSlots(state, style)

		return render(state, slots)
	})
	Component.displayName = name

	return Component
}
