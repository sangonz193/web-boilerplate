import { HeaderProps, HeaderState } from "./Header.types"

export function useHeaderState(props: HeaderProps): HeaderState {
	return {
		slotProp: props.slots ?? {},
	}
}
