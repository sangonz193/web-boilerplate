import { FontIcon, ILinkProps, Link } from "@fluentui/react"
import React from "react"

import { useMatchPath } from "../../modules/Navigation"
import { useHistory } from "../../modules/Navigation/useHistory"
import { useLocation } from "../../modules/Navigation/useLocation"
import { Div } from "../Div"
import { useNavbarButtonStyles } from "./useNavbarButtonStyles"

export type NavbarButtonProps = {
	children?: undefined
	className?: string
	route: string
	routeName: string
	exact?: boolean
	iconName: string
}

const NavbarButtonComponent: React.FC<NavbarButtonProps> = ({ className, route, routeName, exact, iconName }) => {
	const location = useLocation()
	const matchPath = useMatchPath(location.pathname, {
		path: route,
		exact: exact,
	})

	const active = matchPath !== null

	const history = useHistory()
	const handleClick = React.useCallback<Required<ILinkProps>["onClick"]>(
		(e) => {
			if (e.defaultPrevented) {
				return
			}

			e.preventDefault()
			history.push(route)
		},
		[history, route]
	)

	const styles = useNavbarButtonStyles({
		className,
		active,
	})

	return (
		<Link className={styles.wrapper} title={routeName} href={route} onClick={handleClick}>
			{active && <Div className={styles.activeIndicator} />}
			<FontIcon iconName={iconName} className={styles.icon} />
		</Link>
	)
}

export const NavbarButton = React.memo(NavbarButtonComponent)
