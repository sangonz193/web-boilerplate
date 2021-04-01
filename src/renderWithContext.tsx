import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "@fluentui/react"
import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { createGraphqlClient } from "./graphql/createGraphQLClient"
import { InitializationProvider, useIsInitializing } from "./modules/Initialization"
import { NavigationProvider } from "./modules/Navigation"

const themeProviderStyle = { height: "100%" }

const WithWrappers = withWrappers(
	[
		React.StrictMode,
		InitializationProvider,
		(props) => {
			return <ThemeProvider style={themeProviderStyle}>{props.children}</ThemeProvider>
		},
		NavigationProvider,
		({ children }) => <ApolloProvider client={React.useState(createGraphqlClient)[0]}>{children}</ApolloProvider>,
	],
	withSiblings([], (props: { Component: React.FC }) => {
		const isInitializing = useIsInitializing()

		return isInitializing ? null : <props.Component />
	})
)

export const renderWithContext = (Component: React.FC) => <WithWrappers Component={Component} />
