import React from "react"

import { LayoutContext, LayoutOptions } from "./Layout.context"

export const useLayoutOptions = (options: Partial<LayoutOptions>) => {
	const { setLayoutOptions } = React.useContext(LayoutContext)

	React.useEffect(() => {
		setLayoutOptions(options)
	}, Object.keys(options))
}
