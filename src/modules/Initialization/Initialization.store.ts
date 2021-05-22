import { makeVar } from "@apollo/client"

import { listenVar } from "../../_utils/listenVar"

export class InitializationStore {
	blockers = makeVar(0)
	resetCallbacks = makeVar<Array<() => void>>([])
	childrenKey = makeVar(false)

	initializating = makeVar(false)

	listeners: Array<() => void> = []

	constructor() {
		this.listeners.push(listenVar(this.blockers, (newValue) => this.initializating(newValue > 0)))
	}

	block() {
		this.blockers(this.blockers() + 1)
	}

	unblock() {
		this.blockers(this.blockers() - 1)
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
