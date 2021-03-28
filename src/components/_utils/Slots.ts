export type Slots<TSlots> = {
	[TSlotKey in keyof TSlots]: (props: Partial<TSlots[TSlotKey]>) => JSX.Element
}
