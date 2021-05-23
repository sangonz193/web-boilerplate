import type { ReactiveVar } from "@apollo/client"
import { makeVar } from "@apollo/client"
import { Map } from "immutable"

import { makeComputedVar } from "../../_utils/makeComputedVar"

export const initialBlockerId = "initial-blocker"

export class InitializationStore {
	blockers = makeVar(Map([[initialBlockerId as string, true as const]]))
	resetCallbacks = makeVar<Array<() => void>>([])
	childrenKey = makeVar(false)

	initializing: ReactiveVar<boolean>

	listeners: Array<() => void> = []

	constructor() {
		this.initializing = makeComputedVar([this.blockers], ([map]) => {
			return map.size > 0
		})
	}

	block(id: string) {
		this.blockers(this.blockers().set(id, true))
	}

	unblock(id: string) {
		this.blockers(this.blockers().remove(id))
	}

	reset() {
		const resetCallbacks = this.resetCallbacks()

		this.childrenKey(!this.childrenKey())

		this.resetCallbacks([])
		resetCallbacks.forEach((callback) => callback())
	}

	addResetListener(listener: () => void) {
		this.resetCallbacks([...this.resetCallbacks(), listener])
	}

	removeResetListener(listener: () => void) {
		const indexOf = this.resetCallbacks().indexOf(listener)

		if (indexOf >= 0) {
			this.resetCallbacks(this.resetCallbacks().splice(indexOf, 1))
		}
	}

	dispose() {
		this.listeners.forEach((listener) => listener())
	}
}
