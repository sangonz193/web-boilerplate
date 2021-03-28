import { createComponent } from "../_utils/createComponent"
import { HeaderProps, HeaderSlots, HeaderState, HeaderStyles } from "./Header.types"
import { renderHeader } from "./renderHeader"
import { useHeaderSlots } from "./useHeaderSlots"
import { useHeaderState } from "./useHeaderState"
import { useHeaderStyles } from "./useHeaderStyles"

export const Header = createComponent<HeaderProps, HeaderState, HeaderSlots, HeaderStyles>({
	name: "Header",
	useState: useHeaderState,
	useStyles: useHeaderStyles,
	useSlots: useHeaderSlots,
	render: renderHeader,
})
