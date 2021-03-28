import { createComponent } from "../_utils/createComponent"
import { LayoutProps, LayoutSlots, LayoutState, LayoutStyles } from "./Layout.types"
import { renderLayout } from "./renderLayout"
import { useLayoutSlots } from "./useLayoutSlots"
import { useLayoutState } from "./useLayoutState"
import { useLayoutStyles } from "./useLayoutStyles"

export const Layout = createComponent<LayoutProps, LayoutState, LayoutSlots, LayoutStyles>({
	name: "Layout",
	useState: useLayoutState,
	useStyles: useLayoutStyles,
	useSlots: useLayoutSlots,
	render: renderLayout,
})
