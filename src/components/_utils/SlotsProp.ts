import { SlotProp } from "./SlotProp"

export type SlotsProp<TSlots> = {
	[TSlotKey in keyof TSlots]?: SlotProp<TSlots[TSlotKey]>
}
