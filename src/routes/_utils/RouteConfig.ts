export type RouteConfig<TMatchParams = {}, TGetPathOptions = TMatchParams> = {
	path: {} extends TGetPathOptions ? string : (options: TGetPathOptions) => string
	element: (props: TMatchParams) => React.ReactNode
	matchConfig: {
		path: string
		exact?: boolean
		_matchParams?: TMatchParams
	}
}
