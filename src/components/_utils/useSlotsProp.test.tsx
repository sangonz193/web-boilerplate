import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"

import { useSlotsProp } from "./useSlotsProp"

describe("useSlotsProp", () => {
	it("given 1 render type slot, gives correct output", () => {
		type Props = {
			foo: string
		}
		const Component = jest.fn((props: Props) => props.foo)
		const renderedUseSlotsProp = renderHook(() =>
			useSlotsProp<{ header: { foo: string } }>(
				{
					header: {
						type: "props",
						getProps: () => ({ foo: "test" }),
					},
				},
				{
					header: {
						props: {
							foo: "default foo",
						},
						component: Component as any,
					},
				}
			)
		)

		render(<renderedUseSlotsProp.result.current.header />)

		expect(Component).toBeCalledTimes(1)
		expect(Component.mock.calls[0][0].foo).toBe("test")
	})

	it("given 1 render type slot, gives correct output", () => {
		type Props = {
			foo: string
		}

		const Component = jest.fn((props: Props) => props.foo)

		const overwriteFoo = "foo"
		const defaultFoo = "default foo"
		const renderedUseSlotsProp = renderHook(() =>
			useSlotsProp<{ header: { foo: string } }>(
				{
					header: {
						type: "props",
						getProps: (props) => ({ foo: Component.mock.calls.length === 0 ? overwriteFoo : props.foo }),
					},
				},
				{
					header: {
						props: {
							foo: defaultFoo,
						},
						component: Component as any,
					},
				}
			)
		)

		const WrapperComponent = () => {
			return <renderedUseSlotsProp.result.current.header />
		}

		render(<WrapperComponent />).rerender(<WrapperComponent />)

		expect(Component).toBeCalledTimes(2)
		expect(Component.mock.calls[0][0].foo).toBe(overwriteFoo)
		expect(Component.mock.calls[1][0].foo).toBe(defaultFoo)
	})
})
