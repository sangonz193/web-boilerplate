import type { ReactiveVar } from "@apollo/client"
import { useReactiveVar } from "@apollo/client"
import React from "react"

export const useReactiveVars = <TStore extends {}, TKeys extends keyof TStore>(
	store: TStore,
	keys: TKeys[]
): { [K in TKeys]: TStore[K] extends ReactiveVar<infer TValue> ? TValue : never } => {
	const result: {
		[K in keyof typeof store]: typeof store[K] extends ReactiveVar<infer TValue> ? TValue : never
	} = {} as any
	const values = keys.map((key) => {
		const value = useReactiveVar(store[key] as any)
		result[key] = value as any

		return value
	})

	return React.useMemo(() => result, values)
}
