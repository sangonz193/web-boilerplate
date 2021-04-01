import { RouteConfig } from "../_utils/RouteConfig"
import { Home } from "./Home"

export const homeRouteConfig: RouteConfig = {
	path: `/`,
	element: () => <Home />,
	matchConfig: {
		path: `/`,
	},
}
