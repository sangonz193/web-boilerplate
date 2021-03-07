import { ObjectShorthandProps, ShorthandProps } from "@fluentui/react-utilities/lib/compose/types";

import { SafeOmit } from "./SafeOmit";

export type PropsToState<TProps, TShorthandProps extends keyof TProps> = SafeOmit<TProps, TShorthandProps> &
	Required<Pick<TProps, TShorthandProps>> &
	{
		[TShorthandProp in TShorthandProps]: TProps[TShorthandProp] extends ShorthandProps<infer P>
			? ObjectShorthandProps<P>
			: TProps[TShorthandProp];
	};
