import { useRoutes } from "../../hooks/useRoutes"
import { AppProps, AppState } from "./App.types"

export function useAppState(props: AppProps): AppState {
	const [routeConfig, params] = useRoutes() || []

	return {
		slotProp: props.slots ?? {},
		routeConfig,
		routeParams: params,
	}
}
