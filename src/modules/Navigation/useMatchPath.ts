import React from "react"

import { matchPath } from "./matchPath"

// TODO: improve naming
export const useMatchPath = (
	pathname: string,
	options: { path: string; exact?: boolean; strict?: boolean; sensitive?: boolean }
) =>
	React.useMemo(
		() => matchPath(pathname, options),
		[pathname, options.path, options.exact, options.strict, options.sensitive]
	)
