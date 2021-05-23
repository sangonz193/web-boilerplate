import React from "react"

import { dangerousKeysOf } from "../_utils/dangerousKeysOf"
import { matchRouteConfig } from "../modules/Navigation/matchRouteConfig"
import { useLocation } from "../modules/Navigation/useLocation"
import { RouteConfig } from "../routes/_utils/RouteConfig"
import { routesConfig } from "../routes/routes.config"

export const useRoutes = <T extends {}>(): [RouteConfig<any>, T] | null => {
	const location = useLocation()

	return React.useMemo(() => {
		for (const key of dangerousKeysOf(routesConfig)) {
			const routeConfig = routesConfig[key]

			const match = matchRouteConfig(location.pathname, routeConfig)

			if (match) {
				return [routeConfig, (match.params as unknown as any) || {}]
			}
		}

		return null
	}, [location.pathname])
}
