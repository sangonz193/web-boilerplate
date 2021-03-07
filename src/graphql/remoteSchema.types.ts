/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	Void: any
	/** The `Upload` scalar type represents a file upload. */
	Upload: any
}

export type Mutation = {
	__typename: "Mutation"
	_?: Maybe<Scalars["Void"]>
}

export type GenericError = {
	__typename: "GenericError"
	_?: Maybe<Scalars["Void"]>
}

export type NotFoundError = {
	__typename: "NotFoundError"
	_?: Maybe<Scalars["Void"]>
}

export type AuthenticationError = {
	__typename: "AuthenticationError"
	_?: Maybe<Scalars["Void"]>
}

export type Query = {
	__typename: "Query"
	_?: Maybe<Scalars["Void"]>
}

export type User = {
	__typename: "User"
	id: Scalars["ID"]
	email: Scalars["String"]
	name?: Maybe<Scalars["String"]>
	createdAt?: Maybe<Scalars["String"]>
	updatedAt?: Maybe<Scalars["String"]>
	deletedAt?: Maybe<Scalars["String"]>
}

export type CacheControlScope = "PUBLIC" | "PRIVATE"
