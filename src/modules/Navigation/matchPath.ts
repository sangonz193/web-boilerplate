import { Key, pathToRegexp } from "path-to-regexp"

export type MatchPathOptions = { path: string; exact?: boolean; strict?: boolean; sensitive?: boolean }
export type PathMatch<TParams = {}> = {
	path: string
	url: string
	isExact: boolean
	params: TParams
}

const compilePath = (
	path: string,
	options: {
		sensitive?: boolean
		strict?: boolean
		end?: boolean
	}
): {
	regexp: RegExp
	keys: Key[]
} => {
	const keys: Key[] = []
	const regexp = pathToRegexp(path, keys, options)

	return { regexp, keys }
}

export const matchPath = (pathname: string, options: MatchPathOptions): PathMatch | null => {
	const { path, exact = true, strict = false, sensitive = false } = options

	const { regexp, keys } = compilePath(path, {
		end: exact,
		strict,
		sensitive,
	})
	const match = regexp.exec(pathname)

	if (!match) {
		return null
	}

	const [url, ...values] = match
	const isExact = pathname === url

	if (exact && !isExact) {
		return null
	}

	return {
		path, // the path used to match
		url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
		isExact, // whether or not we matched exactly
		params: keys.reduce<Record<string, string>>((memo, key, index) => {
			memo[key.name] = values[index]
			return memo
		}, {}),
	}
}
