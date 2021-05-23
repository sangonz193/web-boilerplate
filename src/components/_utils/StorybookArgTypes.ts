import { ArgTypes } from "@storybook/addons"

export type StorybookArgTypes<TStoryProps> = {
	[TStoryPropName in keyof TStoryProps]: Pick<ArgTypes[""], "name" | "description" | "defaultValue"> & {
		control: {
			type: "text"
		}
	}
}
