import React from "react"

import type { ThemeKey } from "../../styles/themes"
import { useBlockInitialization } from "../Initialization"
import { AppearanceContext } from "./Appearance.context"
import { appearanceLocalStorage, migrateAppearanceLocalStorage } from "./Appearance.storage"
import { AppearanceStore } from "./Appearance.store"
import { getThemeFromKey } from "./getThemeFromKey"
import { SyncTheme } from "./SyncTheme"

export const AppearanceManager: React.FC = () => {
	const unblockInitialization = useBlockInitialization()
	const context = React.useContext(AppearanceContext)
	const contextRef = React.useRef(context)
	contextRef.current = context

	React.useEffect(() => {
		;(async () => {
			await migrateAppearanceLocalStorage()

			if (typeof contextRef.current === "function") {
				const themeKey: ThemeKey = (await appearanceLocalStorage.getItem("theme")) || "light"

				contextRef.current(
					new AppearanceStore({
						themeKey: (await appearanceLocalStorage.getItem("theme")) || "light",
						theme: getThemeFromKey(themeKey, {
							prefersDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
						}),
					})
				)
			}
		})()
	}, [])

	React.useEffect(() => {
		if (typeof context !== "function") {
			unblockInitialization()
		}
	}, [context])

	return typeof context === "function" ? null : <SyncTheme />
}
