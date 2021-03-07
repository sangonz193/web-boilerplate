import { App } from "./App";
import { AppProps } from "./App.types";

export const AppExample = () => {
	const props: AppProps = {};

	return <App {...props}>Hello World!</App>;
};
