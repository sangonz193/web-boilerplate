import { FocusZone, FocusZoneDirection } from "@fluentui/react"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { homeRouteConfig } from "../../routes/home/homeRoute.config"
import { settingsRouteConfig } from "../../routes/settings/settingsRoute.config"
import { Breakpoint } from "../../styles/Breakpoint"
import { HOME_ICON_NAME } from "../Icon/Home.icon"
import { SETTINGS_ICON_NAME } from "../Icon/Settings.icon"
import { NavbarButton } from "../NavbarButton"
import { useNavbarStyles } from "./useNavbarStyles"

export type NavbarProps = {
	children?: undefined
}

const NavbarComponent: React.FC<NavbarProps> = () => {
	const isMd = useMediaQuery({ minWidth: Breakpoint.md })
	const styles = useNavbarStyles()

	return (
		<FocusZone
			direction={isMd ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal}
			className={styles.focusZone}
		>
			<NavbarButton
				exact
				iconName={HOME_ICON_NAME}
				route={homeRouteConfig.path}
				routeName="Home"
				className={styles.home}
			/>
			<NavbarButton
				exact
				iconName={SETTINGS_ICON_NAME}
				route={settingsRouteConfig.path}
				routeName="Settings"
				className={styles.settings}
			/>
		</FocusZone>
	)
}

export const Navbar = React.memo(NavbarComponent)
