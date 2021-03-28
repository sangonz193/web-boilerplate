import { mergeSlotProp } from "./mergeSlotProp"

describe("mergeSlotProp", () => {
	it("given 1 render type slot, gives correct output", () => {
		type Props = {
			foo: string
			bar: number
		}
		const renderResult = (props: Props) => `foo: "${props.foo}", bar: ${props.bar}`

		const mergedSlotRender = mergeSlotProp<Props>({
			type: "render",
			render: renderResult,
		})

		const slotRender = mergedSlotRender(
			{
				foo: "foo",
				bar: 1,
			},
			null as any
		)

		expect(slotRender).toBe(renderResult({ foo: "foo", bar: 1 }))
	})

	it("given 1 render type slot and 1 props type slot, gives correct output", () => {
		const newFoo = "new foo"

		type Props = {
			foo: string
			bar: number
		}
		const renderResult = (props: Props) => `foo: "${props.foo}", bar: ${props.bar}`

		const mergedSlotRender = mergeSlotProp<Props>(
			{
				type: "props",
				getProps: (props) => ({ ...props, foo: newFoo }),
			},
			{
				type: "render",
				render: renderResult,
			}
		)

		const slotRender = mergedSlotRender(
			{
				foo: "foo",
				bar: 1,
			},
			null as any
		)

		expect(slotRender).toBe(renderResult({ foo: newFoo, bar: 1 }))
	})

	it("given 1 obtrusive render type slot, gives correct output", () => {
		const newFoo = "new foo"
		type Props = {
			foo: string
			bar: number
		}
		const renderResult = (props: Props) => `foo: "${props.foo}", bar: ${props.bar}`

		const overrideMessage = `override other slots`
		const obtrusiveRender = jest.fn<string, [Props]>(() => overrideMessage)
		const mergedSlotRender = mergeSlotProp<Props>(
			{
				type: "props",
				getProps: (props) => ({ ...props, foo: newFoo }),
			},
			{
				type: "render",
				render: obtrusiveRender,
			},
			{
				type: "render",
				render: renderResult,
			}
		)

		const slotRender = mergedSlotRender(
			{
				foo: "foo",
				bar: 1,
			},
			null as any
		)

		expect(obtrusiveRender).toBeCalledTimes(1)
		expect(obtrusiveRender.mock.calls[0][0].foo).toBe(newFoo)
		expect(slotRender).toBe(overrideMessage)
	})

	it("given 1 content type slot and 1 render type slot, gives correct output", () => {
		const newContent = "new children"

		type Props = {
			foo: string
			bar: number
			children?: string
		}
		const renderResult = (props: Props) => props.children

		const mergedSlotRender = mergeSlotProp<Props>(
			{
				type: "content",
				content: newContent,
			},
			{
				type: "render",
				render: renderResult,
			}
		)

		const slotRender = mergedSlotRender(
			{
				foo: "foo",
				bar: 1,
			},
			null as any
		)

		expect(slotRender).toBe(newContent)
	})
})
