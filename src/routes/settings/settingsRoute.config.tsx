import { appConfig } from "../../config/app.config"
import { RouteConfig } from "../_utils/RouteConfig"
import { Settings } from "./Settings"

export const settingsRouteConfig: RouteConfig = {
	path: `${appConfig.historyBasename}/settings`,
	element: () => <Settings />,
	matchConfig: {
		path: `${appConfig.historyBasename}/settings`,
	},
}
