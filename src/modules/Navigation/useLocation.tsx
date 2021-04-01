import { Location } from "history"
import React from "react"

import { useHistory } from "./useHistory"

export const useLocation = (): Location => {
	const [, forceUpdate] = React.useState<{}>()
	const history = useHistory()

	React.useEffect(() => {
		const listener = history.listen(() => forceUpdate({}))

		return () => listener()
	}, [])

	return history.location
}
