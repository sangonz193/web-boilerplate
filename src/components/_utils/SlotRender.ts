export type SlotRender<TProps> = (
	props: TProps,
	defaultRenderer: (props: TProps) => React.ReactElement | React.ReactNode
) => React.ReactElement | React.ReactNode
