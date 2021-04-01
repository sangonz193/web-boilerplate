import React from "react"

import { LayoutContext, LayoutOptions } from "./Layout.context"

export const useLayoutOptions = (getOptions: () => Partial<LayoutOptions>) => {
	const { setLayoutOptions } = React.useContext(LayoutContext)

	React.useEffect(() => {
		setLayoutOptions(getOptions())
	}, [getOptions])
}
