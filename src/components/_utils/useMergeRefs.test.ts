import { renderHook } from "@testing-library/react-hooks"

import { useMergeRefs } from "./useMergeRefs"

describe("given 1 object ref", () => {
	test("when ref callback is called", () => {
		const objectRef = {
			current: null,
		}

		const renderedHook = renderHook(() => useMergeRefs<string>(objectRef))

		const refValue = "test"
		renderedHook.result.current(refValue)

		expect(objectRef.current).toBe(refValue)
	})
})

describe("given 1 callback ref", () => {
	test("when ref callback is called", () => {
		const callbackRef = jest.fn(() => {})
		const renderedHook = renderHook(() => useMergeRefs<string>(callbackRef))

		const refValue = "test"
		renderedHook.result.current(refValue)

		expect(callbackRef).toBeCalledTimes(1)
		expect(callbackRef).toBeCalledWith(refValue)
	})
})

describe("given 1 object and 1 function refs", () => {
	test("when ref callback is called", () => {
		const objectRef = {
			current: null,
		}
		const callbackRef = jest.fn(() => {})

		const renderedHook = renderHook(() => useMergeRefs<string>(objectRef, callbackRef))

		const refValue = "test"
		renderedHook.result.current(refValue)

		expect(callbackRef).toBeCalledTimes(1)
		expect(callbackRef).toBeCalledWith(refValue)
		expect(objectRef.current).toBe(refValue)
	})
})
