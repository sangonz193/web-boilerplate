import { RouteConfig } from "../_utils/RouteConfig"
import { Settings } from "./components/Settings/Settings"

export const settingsRouteConfig: RouteConfig = {
	path: `/settings`,
	element: () => <Settings />,
	matchConfig: {
		path: `/settings`,
	},
}
