import { Meta } from "@storybook/react/types-6-0";

import { App } from "./App";
import { AppProps } from "./App.types";

export const AppExample = () => {
	const props: AppProps = {};

	return <App {...props}>Hello World!</App>;
};

export default {
	title: "Example/Button2",
	component: AppExample,
	argTypes: {
		backgroundColor: { control: "color" },
	},
} as Meta;
