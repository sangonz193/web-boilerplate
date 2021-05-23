import { useReactiveVar } from "@apollo/client"
import React from "react"
import { useMediaQuery } from "react-responsive"

import { applyThemeOutsideContext } from "./applyThemeOutsideContext"
import { getThemeFromKey } from "./getThemeFromKey"
import { useAppearanceStore } from "./useAppearanceStore"

export const SyncTheme: React.FC = () => {
	const store = useAppearanceStore()
	const themeKey = useReactiveVar(store.themeKey)

	const prefersDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })
	React.useEffect(() => {
		const theme = getThemeFromKey(themeKey, { prefersDarkMode })

		applyThemeOutsideContext(theme)
		store.currentTheme(theme)
	}, [themeKey, prefersDarkMode])

	return null
}
