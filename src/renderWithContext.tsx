import { ApolloProvider } from "@apollo/client"
import React from "react"

import { withSiblings } from "./_utils/withSiblings"
import { withWrappers } from "./_utils/withWrapper"
import { createGraphqlClient } from "./graphql/createGraphQLClient"
import { InitializationProvider, useIsInitializing } from "./modules/Initialization"

const WithWrappers = withWrappers(
	[
		InitializationProvider,
		({ children }) => <ApolloProvider client={React.useState(createGraphqlClient)[0]}>{children}</ApolloProvider>,
	],
	withSiblings([], (props: { Component: React.FC }) => {
		const isInitializing = useIsInitializing()

		return isInitializing ? null : <props.Component />
	})
)

export const renderWithStructure = (Component: React.FC) => <WithWrappers Component={Component} />
