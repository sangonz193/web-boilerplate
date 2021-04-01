import { RouteConfig } from "../../routes/_utils/RouteConfig"
import { matchPath, PathMatch } from "./matchPath"

export const matchRouteConfig = <T extends RouteConfig<any>>(
	pathname: string,
	routeConfig: T
): PathMatch<Exclude<T["matchConfig"]["_matchParams"], undefined>> | null =>
	matchPath(pathname, {
		path: routeConfig.matchConfig.path,
		exact: routeConfig.matchConfig.exact,
	}) as PathMatch<Exclude<T["matchConfig"]["_matchParams"], undefined>> | null
