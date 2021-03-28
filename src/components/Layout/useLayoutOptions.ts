import React from "react"

import { LayoutContext } from "./Layout.context"
import { LayoutOptions } from "./Layout.types"

export const useLayoutOptions = (getOptions: () => Partial<LayoutOptions>) => {
	const { setLayoutOptions } = React.useContext(LayoutContext)

	React.useEffect(() => {
		setLayoutOptions(getOptions())
	}, [getOptions])
}
