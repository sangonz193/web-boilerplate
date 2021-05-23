import type { ReactiveVar } from "@apollo/client"
import { makeVar } from "@apollo/client"
import type { ITheme } from "@fluentui/style-utilities"

import type { ThemeKey } from "../../styles/themes"
import { appearanceLocalStorage } from "./Appearance.storage"

export type AppearanceStoreInitData = {
	themeKey: ThemeKey
	theme: ITheme
}

export class AppearanceStore {
	themeKey: ReactiveVar<ThemeKey>
	currentTheme: ReactiveVar<ITheme>

	constructor(initData: AppearanceStoreInitData) {
		const { themeKey, theme } = initData

		this.themeKey = makeVar(themeKey)
		this.currentTheme = makeVar(theme)
	}

	setTheme(themeKey: ThemeKey) {
		this.themeKey(themeKey)
		appearanceLocalStorage.setItem("theme", themeKey)
	}
}
