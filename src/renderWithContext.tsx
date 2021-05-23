import { ApolloProvider } from "@apollo/client"
import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { createGraphqlClient } from "./graphql/createGraphQLClient"
import { useRefWithInitializer } from "./hooks/useRefWithInitializer"
import { AppManager, AppProvider } from "./modules/App"
import { AppearanceManager, AppearanceProvider } from "./modules/Appearance"
import { InitializationProvider, useIsInitializing } from "./modules/Initialization"
import { NavigationProvider } from "./modules/Navigation"
import { RootEventListenersProvider } from "./modules/RootEventListeners"

const WithWrappers = withWrappers(
	[
		React.StrictMode,
		InitializationProvider,
		RootEventListenersProvider,
		AppProvider,
		AppearanceProvider,
		NavigationProvider,
		({ children }) => (
			<ApolloProvider client={useRefWithInitializer(createGraphqlClient).current}>{children}</ApolloProvider>
		),
	],
	withSiblings([AppManager, AppearanceManager], (props: { Component: React.FC }) => {
		const isInitializing = useIsInitializing()

		return isInitializing ? null : <props.Component />
	})
)

export const renderWithContext = (Component: React.FC) => <WithWrappers Component={Component} />
