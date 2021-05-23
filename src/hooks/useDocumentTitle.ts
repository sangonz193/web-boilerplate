import React from "react"

export const useDocumentTitle: (title: string) => void = (title) => {
	React.useEffect(() => {
		document.title = title
	}, [title])
}
