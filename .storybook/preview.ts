import { Parameters } from "@storybook/addons"

export const parameters: Parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		include: [],
		hideNoControlsWarning: true,
	},
}
