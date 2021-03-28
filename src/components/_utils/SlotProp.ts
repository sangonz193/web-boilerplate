export type RenderSlot<TProps> = {
	type: "render"
	render: (
		props: TProps,
		defaultRenderer: (props: TProps) => React.ReactElement | React.ReactNode
	) => React.ReactElement | React.ReactNode
}

export type PropsSlot<TProps> = {
	type: "props"
	getProps: (props: TProps) => TProps
}

export type ContentSlot<TProps> = {
	type: "content"
	content: "children" extends keyof TProps ? TProps["children"] : never
}

export type SlotProp<TProps> = RenderSlot<TProps> | PropsSlot<TProps> | ContentSlot<TProps> | Array<SlotProp<TProps>>
