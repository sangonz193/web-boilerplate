import { appConfig } from "../config/app.config"

export type TypedStorageKeyValue = Record<string, unknown>

export type TypedStorageDeserializerOptions = {
	storageValue: string
	deleteItem: () => Promise<null>
}

export type TypedStorageDeserializerMap<TKeyValue extends TypedStorageKeyValue> = {
	[K in keyof TKeyValue]: (
		options: TypedStorageDeserializerOptions
	) => TKeyValue[K] | null | Promise<TKeyValue[K] | null>
}

export type TypedStorageSerializerOptions<T> = {
	value: T
}

export type TypedStorageSerializerMap<TKeyValue extends TypedStorageKeyValue> = {
	[K in keyof TKeyValue]: (options: TypedStorageSerializerOptions<TKeyValue[K]>) => string
}

export type CreateTypedStorageOptions<TKeyValue extends TypedStorageKeyValue> = {
	scope: string
	sessionStorage?: boolean
	keyKeys: { [K in keyof TKeyValue]: 0 }
	serializers: TypedStorageSerializerMap<TKeyValue>
	deserializers: TypedStorageDeserializerMap<TKeyValue>
}

const getNativeStorage = (options: { sessionStorage: boolean }): Storage | undefined => {
	try {
		const testKey = "test-key"

		const storage = window[options.sessionStorage ? "sessionStorage" : "localStorage"]
		storage.setItem(testKey, testKey)

		const isSame = storage.getItem(testKey) == testKey
		storage.removeItem(testKey)

		return isSame ? storage : undefined
	} catch (exception) {}

	return undefined
}

const getInMemoryStorage = (): Storage => {
	let inMemoryMap: Record<string, string | undefined> = {}

	return {
		getItem(key: string) {
			return inMemoryMap[key] ?? null
		},

		setItem(key: string, value: string) {
			inMemoryMap[key] = value
		},

		removeItem(key: string) {
			delete inMemoryMap[key]
		},

		key(index: number) {
			const keys = Object.keys(inMemoryMap)

			return keys.length >= index ? null : keys[index]
		},

		clear() {
			inMemoryMap = {}
		},

		get length() {
			return Object.keys(inMemoryMap).length
		},
	}
}

export const untypedSessionStorage: { isInMemoryStorage: boolean; storage: Storage } = (() => {
	const nativeStorage = getNativeStorage({ sessionStorage: true })
	return nativeStorage
		? { isInMemoryStorage: false, storage: nativeStorage }
		: { isInMemoryStorage: true, storage: getInMemoryStorage() }
})()

export const untypedLocalStorage: { isInMemoryStorage: boolean; storage: Storage } = (() => {
	const nativeStorage = getNativeStorage({ sessionStorage: false })
	return nativeStorage
		? { isInMemoryStorage: false, storage: nativeStorage }
		: { isInMemoryStorage: true, storage: getInMemoryStorage() }
})()

export const createTypedStorage = <TKeyValue extends TypedStorageKeyValue>(
	options: CreateTypedStorageOptions<{ [K in Extract<keyof TKeyValue, string>]: TKeyValue[K] }>
) => {
	type Key = Extract<keyof TKeyValue, string>

	const untypedStorage = options.sessionStorage ? untypedSessionStorage : untypedLocalStorage
	const storage = untypedStorage.storage

	return {
		isInMemoryStorage: untypedStorage.isInMemoryStorage,

		async getItem<TKey extends Key>(key: TKey): Promise<TKeyValue[TKey] | null> {
			await new Promise((r) => setTimeout(r))
			const storageValue = storage.getItem(this.getScopedKey(key))
			return storageValue === null
				? null
				: options.deserializers[key]({
						storageValue,
						deleteItem: async () => {
							await this.removeItem(key)
							return null
						},
				  })
		},

		async setItem<TKey extends Key>(key: TKey, value: TKeyValue[TKey]): Promise<void> {
			await new Promise((r) => setTimeout(r))
			storage.setItem(this.getScopedKey(key), options.serializers[key]({ value }))
		},

		async removeItem(key: Key): Promise<void> {
			await new Promise((r) => setTimeout(r))
			storage.removeItem(this.getScopedKey(key))
		},

		async clean(): Promise<void> {
			await new Promise((r) => setTimeout(r))
			;(Object.keys(options.keyKeys) as Array<keyof typeof options["keyKeys"]>).forEach((k) => {
				storage.removeItem(this.getScopedKey(k))
			})
		},

		getScopedKey(key: Key) {
			return `${appConfig.shortCodeName}-${appConfig.storageScope}-${options.scope}-${key}`
		},

		_untypedStorage: storage,
	}
}
