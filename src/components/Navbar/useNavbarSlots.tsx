import { FocusZone, FocusZoneDirection } from "@fluentui/react-focus"
import { css } from "@fluentui/utilities"

import { homeRouteConfig } from "../../routes/home/homeRouteConfig"
import { settingsRouteConfig } from "../../routes/settings/settingsRouteConfig"
import { Slots } from "../_utils/Slots"
import { useSlotsProp } from "../_utils/useSlotsProp"
import { HOME_ICON_NAME } from "../Icon/Home.icon"
import { SETTINGS_ICON_NAME } from "../Icon/Settings.icon"
import { NavbarButton } from "../NavbarButton"
import { NavbarSlots, NavbarState, NavbarStyles } from "./Navbar.types"

export function useNavbarSlots(state: NavbarState, styles: NavbarStyles): Slots<NavbarSlots> {
	const { isMd } = state

	return useSlotsProp<NavbarSlots>(state.slotProp, {
		focusZone: {
			component: FocusZone,
			props: {
				className: styles.focusZone,
				direction: isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal,
			},
		},

		home: {
			component: NavbarButton,
			props: {
				exact: true,
				route: homeRouteConfig.path,
				routeName: "Home",
				slots: {
					wrapper: {
						type: "props",
						getProps: (props) => ({ ...props, className: css(props.className, styles.home) }),
					},
					icon: {
						type: "props",
						getProps: (props) => ({ ...props, iconName: HOME_ICON_NAME }),
					},
				},
			},
		},

		settings: {
			component: NavbarButton,
			props: {
				exact: true,
				route: settingsRouteConfig.path,
				routeName: "Home",
				slots: {
					wrapper: {
						type: "props",
						getProps: (props) => ({ ...props, className: css(props.className, styles.settings) }),
					},
					icon: {
						type: "props",
						getProps: (props) => ({ ...props, iconName: SETTINGS_ICON_NAME }),
					},
				},
			},
		},
	})
}
