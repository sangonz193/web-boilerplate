/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import gql from "graphql-tag"

export const remoteSchema = gql`
	scalar Void

	type Mutation {
		_: Void
	}

	type GenericError {
		_: Void
	}

	type NotFoundError {
		_: Void
	}

	type AuthenticationError {
		_: Void
	}

	type Query {
		_: Void
	}

	type User {
		id: ID!
		email: String!
		name: String
		createdAt: String
		updatedAt: String
		deletedAt: String
	}

	enum CacheControlScope {
		PUBLIC
		PRIVATE
	}

	"""
	The \`Upload\` scalar type represents a file upload.
	"""
	scalar Upload
`
