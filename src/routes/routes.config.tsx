import { Redirect } from "../components/Redirect"
import type { RouteConfig } from "./_utils/RouteConfig"
import { homeRouteConfig } from "./home/homeRoute.config"
import { settingsRouteConfig } from "./settings/settingsRoute.config"

const redirectConfig: RouteConfig = {
	path: "",
	element: () => <Redirect to={homeRouteConfig.path} />,
	matchConfig: {
		path: "/",
		exact: false,
	},
}

export const routesConfig = {
	home: homeRouteConfig,
	settings: settingsRouteConfig,
	redirect: redirectConfig,
}
