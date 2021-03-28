import { AppProps, AppState } from "./App.types"

export function useAppState(props: AppProps): AppState {
	return {
		slotProp: props.slots ?? {},
		children: props.children,
	}
}
