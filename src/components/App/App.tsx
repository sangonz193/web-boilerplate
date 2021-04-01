import React from "react"

import { useRoutes } from "../../hooks/useRoutes"
import { Layout } from "../Layout"

export type AppProps = {
	children?: never
}

export const App: React.FC<AppProps> = ({}) => {
	const [routeConfig, params] = useRoutes() || []

	return <Layout>{routeConfig?.element(params)}</Layout>
}
