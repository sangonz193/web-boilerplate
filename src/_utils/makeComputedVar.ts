import type { ReactiveVar } from "@apollo/client"
import { makeVar } from "@apollo/client"

import { listenVar } from "./listenVar"

export function makeComputedVar<ArrT extends readonly [ReactiveVar<any>, ...Array<ReactiveVar<any>>], TReturn>(
	reactiveVars: ArrT,
	listener: (
		values: { -readonly [i in keyof ArrT]: ArrT[i] extends ReactiveVar<infer TVar> ? TVar : never }
	) => TReturn
) {
	const listenersParams = reactiveVars.map((reactiveVar) => reactiveVar()) as {
		-readonly [i in keyof ArrT]: ArrT[i] extends ReactiveVar<infer TVar> ? TVar : never
	}

	const result = makeVar(listener(listenersParams))
	let timeout: number
	reactiveVars.forEach((reactiveVar, index) => {
		listenVar(reactiveVar, (newValue) => {
			listenersParams[index] = newValue

			window.clearTimeout(timeout)
			timeout = window.setTimeout(() => {
				result(listener(listenersParams))
			})
		})
	})

	return result
}
