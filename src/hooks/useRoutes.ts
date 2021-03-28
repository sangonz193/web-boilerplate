import React from "react"

import { dangerousKeysOf } from "../_utils/dangerousKeysOf"
import { matchRouteConfig } from "../modules/Navigation/matchRouteConfig"
import { useLocation } from "../modules/Navigation/useLocation"
import { RouteConfig } from "../routes/_utils/RouteConfig"
import { homeRouteConfig } from "../routes/home/homeRouteConfig"
import { settingsRouteConfig } from "../routes/settings/settingsRouteConfig"

export const useRoutes = <T extends {}>(): [RouteConfig<any>, T] | null => {
	const location = useLocation()

	return React.useMemo(() => {
		const routeConfigMap = {
			home: homeRouteConfig,
			settings: settingsRouteConfig,
		}

		for (const key of dangerousKeysOf(routeConfigMap)) {
			const routeConfig = routeConfigMap[key]

			const match = matchRouteConfig(location.pathname, routeConfig)

			if (match) {
				return [routeConfig, ((match.params as unknown) as any) || {}]
			}
		}

		return null
	}, [location.pathname])
}
