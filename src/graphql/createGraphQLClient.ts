import { ApolloClient, ApolloLink, Resolvers, TypePolicy } from "@apollo/client"
import { InMemoryCache } from "@apollo/client/cache"
import { BatchHttpLink } from "@apollo/client/link/batch-http"
import { setContext } from "@apollo/client/link/context"
import { GraphQLError } from "graphql/error/GraphQLError"
import { execute } from "graphql/execution/execute"
import { print } from "graphql/language/printer"
import { buildSchema } from "graphql/utilities/buildASTSchema"

import { hasProperty } from "../_utils/hasProperty"
import { isObject } from "../_utils/isObject"
import { graphqlConfig } from "./graphql.config"
import { remoteSchema } from "./remoteSchema.graphql"
import { Mutation, Query, Scalars } from "./remoteSchema.types"
import { possibleTypes } from "./remoteSchemaPossibleTypes"

type _ResolversParentTypes = {
	Query: Query
	Mutation: Mutation
}

const shemaPromise = import("./remoteSchema.graphql")

const getSchemaLink = setContext(async () => {
	return {
		schema: await shemaPromise,
	}
})

let getSchema = (context: Record<string, any>) => {
	const schema = buildSchema(print(context.schema))
	getSchema = () => schema

	return schema
}

export const ValidationAndCacheLink = () => {
	return new ApolloLink((operation, forward) => {
		const schema = getSchema(operation.getContext())

		return forward(operation).map((value) => {
			const execResult = execute({
				schema,
				document: operation.query,
				rootValue: value.data,
				variableValues: operation.variables,
			})

			const isPromise = (value: unknown): value is Promise<unknown> =>
				isObject(value) && hasProperty(value, "then") && typeof value.then === "function"

			value.errors = [new GraphQLError("Unexpected promise returned from `execute`")]

			return isPromise(execResult)
				? {
						data: {},
						graphQLErrors: [new GraphQLError("Unexpected promise returned from `execute`")],
				  }
				: {
						data: execResult.data ?? {},
						errors: execResult.errors,
				  }
		})
	})
}

type TypePolicies = {
	[K in keyof Omit<_ResolversParentTypes, keyof Scalars>]?: K extends keyof Resolvers ? TypePolicy : {}
}

export const createGraphqlClient = () => {
	const typePolicies: TypePolicies = {}

	const cache: InMemoryCache = new InMemoryCache({
		addTypename: true,
		possibleTypes,
		typePolicies: typePolicies as Required<typeof typePolicies>,
	})

	const apolloClient = new ApolloClient({
		connectToDevTools: true,
		link: ApolloLink.from([getSchemaLink, ValidationAndCacheLink(), new BatchHttpLink({ uri: graphqlConfig.uri })]),
		cache,
		typeDefs: remoteSchema,
	})

	return apolloClient
}
