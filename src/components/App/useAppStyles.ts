import { ax, makeStyles } from "@fluentui/react-make-styles";

import { AppState } from "./App.types";

const useRootStyles = makeStyles<AppState>([
	[
		null,
		(theme) => ({
			backgroundColor: theme.global.color.hyperlink,
		}),
	],
]);

export const useAppStyles = (state: AppState): AppState => {
	state.className = ax(useRootStyles(state), state.className);

	return state;
};
