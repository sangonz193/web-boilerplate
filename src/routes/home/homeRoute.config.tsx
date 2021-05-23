import { appConfig } from "../../config/app.config"
import { RouteConfig } from "../_utils/RouteConfig"
import { Home } from "./Home"

export const homeRouteConfig: RouteConfig = {
	path: appConfig.historyBasename || "/",
	element: () => <Home />,
	matchConfig: {
		path: appConfig.historyBasename || "/",
	},
}
