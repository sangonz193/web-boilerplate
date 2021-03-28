import { useIsHover } from "../../hooks/useIsHover"
import { useLocation } from "../../modules/Navigation/useLocation"
import { useMatchPath } from "../../modules/Navigation/useMatchPath"
import { NavbarButtonProps, NavbarButtonState } from "./NavbarButton.types"

export function useNavbarButtonState(props: NavbarButtonProps): NavbarButtonState {
	const [isHover, isHoverBindings] = useIsHover()

	const location = useLocation()
	const matchPath = useMatchPath(location.pathname, {
		path: props.route,
		exact: props.exact,
	})

	return {
		slotProp: props.slots ?? {},
		children: props.children,
		active: matchPath !== null,
		isHover,
		isHoverBindings,
		props,
	}
}
