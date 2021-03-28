import { SlotProp } from "./SlotProp"
import { SlotRender } from "./SlotRender"

const _defaultRenderer: SlotRender<any> = (props, defaultRenderer) => defaultRenderer(props)

export const mergeSlotProp = <TSlotProps>(...slotProps: Array<SlotProp<TSlotProps>>): SlotRender<TSlotProps> => {
	const getSlotPropsRenderer: (slotProps: Array<SlotProp<TSlotProps>>) => SlotRender<TSlotProps> = (
		slotProps: Array<SlotProp<TSlotProps>>
	): SlotRender<TSlotProps> => {
		return slotProps.reduce<SlotRender<TSlotProps>>((result, slotProp) => {
			if (Array.isArray(slotProp)) {
				return (props, defaultRenderer) => {
					return result(props, (props) => {
						return getSlotPropsRenderer(slotProp)(props, defaultRenderer)
					})
				}
			}

			switch (slotProp.type) {
				case "content": {
					return (props, defaultRenderer) => {
						return result(props, (props) => {
							return defaultRenderer({
								...props,
								children: slotProp.content,
							})
						})
					}
				}
				case "props": {
					return (props, defaultRenderer) => {
						return result(props, (props) => {
							return defaultRenderer(slotProp.getProps(props))
						})
					}
				}
				case "render": {
					return (props, defaultRenderer) => {
						return result(props, (props) => slotProp.render(props, defaultRenderer))
					}
				}
			}
		}, _defaultRenderer)
	}

	return getSlotPropsRenderer(slotProps)
}
