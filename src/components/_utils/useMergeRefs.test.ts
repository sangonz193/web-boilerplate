import { renderHook } from "@testing-library/react-hooks"

import { useMergeRefs } from "./useMergeRefs"

describe("useMergeRefs", () => {
	test("handles object ref correctly", () => {
		const objectRef = {
			current: null,
		}

		const renderedHook = renderHook(() => useMergeRefs<string>(objectRef))

		const refValue = "test"
		renderedHook.result.current(refValue)

		expect(objectRef.current).toBe(refValue)
	})

	test("handles callback ref correctly", () => {
		const callbackRef = jest.fn(() => {})

		const renderedHook = renderHook(() => useMergeRefs<string>(callbackRef))

		const refValue = "test"
		renderedHook.result.current(refValue)

		expect(callbackRef).toBeCalledTimes(1)
		expect(callbackRef).toBeCalledWith(refValue)
	})

	test("handles object and callback refs correctly", () => {
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
