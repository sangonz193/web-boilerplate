import { makeMergeProps, resolveShorthandProps } from "@fluentui/react-utilities";
import identity from "lodash/identity";
import React from "react";

import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { AppDefaults, AppProps, AppShorthandProps, AppState } from "./App.types";

export const appShorthandProps = dangerousKeysOf(
	identity<Record<keyof AppShorthandProps, 0>>({
		learnReact: 0,
		header: 0,
		headerContent: 0,
		headerContentCode: 0,
	})
);

const mergeProps = makeMergeProps<AppState>({ deepMerge: appShorthandProps });

export const useApp = (props: AppProps, ref: React.Ref<HTMLElement>, defaultProps?: AppProps): AppState => {
	const defaults: AppDefaults = {
		ref,
		as: "div",
		learnReact: {
			as: "span",
			children: "Learn react",
		},
		header: {
			as: "header",
			children: null,
		},
		headerContent: {
			as: "p",
			children: () => ["Edit any ", state.headerContentCode.children, " and save to reload."],
		},
		headerContentCode: {
			as: "code",
			children: "src/components/App/*",
		},
	};
	const state = mergeProps(defaults, defaultProps, resolveShorthandProps(props, appShorthandProps));

	return state;
};
