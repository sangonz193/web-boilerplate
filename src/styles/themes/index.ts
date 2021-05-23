import { hasProperty } from "@sangonz193/utils/hasProperty"
import identity from "lodash/identity"

export type ThemeKey = "light" | "dark" | "black" | "auto"

export const isThemeKey = (value: string): value is ThemeKey => {
	return hasProperty(
		identity<Record<ThemeKey, 0>>({
			auto: 0,
			light: 0,
			black: 0,
			dark: 0,
		}),
		value
	)
}
