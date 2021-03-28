import { RouteConfig } from "../_utils/RouteConfig"
import { Home } from "./components/Home"

export const homeRouteConfig: RouteConfig = {
	path: `/`,
	element: () => <Home />,
	matchConfig: {
		path: `/`,
	},
}
