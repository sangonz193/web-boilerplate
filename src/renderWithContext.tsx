import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@fluentui/react"
import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { createGraphqlClient } from "./graphql/createGraphQLClient"
import { AppManager, AppProvider } from "./modules/App"
import { InitializationProvider, useIsInitializing } from "./modules/Initialization"
import { NavigationProvider } from "./modules/Navigation"
import { RootEventListenersProvider } from "./modules/RootEventListeners"

const themeProviderStyle = { height: "100%" }

const WithWrappers = withWrappers(
	[
		React.StrictMode,
		InitializationProvider,
		RootEventListenersProvider,
		(props) => {
			return <ThemeProvider style={themeProviderStyle}>{props.children}</ThemeProvider>
		},
		AppProvider,
		NavigationProvider,
		({ children }) => <ApolloProvider client={React.useState(createGraphqlClient)[0]}>{children}</ApolloProvider>,
	],
	withSiblings([AppManager], (props: { Component: React.FC }) => {
		const isInitializing = useIsInitializing()

		return isInitializing ? null : <props.Component />
	})
)

export const renderWithContext = (Component: React.FC) => <WithWrappers Component={Component} />
