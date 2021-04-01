import React from "react"

import { useRoutes } from "../../hooks/useRoutes"

export type AppProps = {
	children?: never
}

export const App: React.FC<AppProps> = ({}) => {
	const [routeConfig, params] = useRoutes() || []

	return <div>{routeConfig?.element(params)}</div>
}
