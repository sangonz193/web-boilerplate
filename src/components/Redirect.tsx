import React from "react"

import { useHistory } from "../modules/Navigation/useHistory"

export type RedirectProps = {
	to: string
}

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
	const history = useHistory()

	React.useEffect(() => {
		history.replace(to)
	}, [])

	return null
}
