import { makeVar } from "@apollo/client"

export type EventsMap = Required<Omit<React.DOMAttributes<Element>, "children" | "dangerouslySetInnerHTML" | "css">>

export class RootEventListenersStore {
	listenersMap = makeVar<{ [K in keyof EventsMap]?: Array<EventsMap[K]> }>({})
	listeners = makeVar<Partial<EventsMap>>({})

	constructor() {
		this.listenersMap.onNextChange((newValue) => {
			const entries =
				(Object.entries(newValue) as unknown as Array<
					Exclude<
						{
							[K in keyof typeof newValue]: [K, Exclude<typeof newValue[K], undefined>]
						}[keyof typeof newValue],
						undefined
					>
				>) || []

			this.listeners(
				entries.reduce<Partial<EventsMap>>((res, [key, listeners]) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					res[key] = (event: any) => {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						listeners.forEach((listener: any) => {
							listener(event)
						})
					}

					return res
				}, {})
			)
		})
	}

	addListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listenersMap = this.listenersMap()
		const listeners = listenersMap[event]

		this.listenersMap({
			...this.listenersMap(),
			[event]: [...((listeners || []) as []), listener],
		})
	}

	removeListener<T extends keyof EventsMap>(event: T, listener: EventsMap[T]) {
		const listenersMap = this.listenersMap()
		const listeners = listenersMap[event]
		const listenerIndex = listeners?.indexOf(listener) ?? -1

		if (listenerIndex >= 0) {
			listeners?.splice(listenerIndex, 1)
		}

		if (listeners) {
			this.listenersMap({
				...this.listenersMap(),
				[event]: listeners,
			})
		}
	}
}
