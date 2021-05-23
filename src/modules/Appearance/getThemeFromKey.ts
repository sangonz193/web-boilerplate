import type { ITheme } from "@fluentui/style-utilities"

import type { ThemeKey } from "../../styles/themes"
import { blackTheme } from "../../styles/themes/blackTheme"
import { darkTheme } from "../../styles/themes/darkTheme"
import { lightTheme } from "../../styles/themes/lightTheme"

export function getThemeFromKey(themeKey: ThemeKey, options: { prefersDarkMode?: boolean }): ITheme {
	const { prefersDarkMode = false } = options
	const themeMap: Record<ThemeKey, ITheme> = {
		auto: prefersDarkMode ? darkTheme : lightTheme,
		light: lightTheme,
		dark: darkTheme,
		black: blackTheme,
	}

	return themeMap[themeKey]
}
