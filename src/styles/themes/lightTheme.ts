import type { IPartialTheme } from "@fluentui/react/lib/Styling"
import { createTheme } from "@fluentui/react/lib/Styling"

const palette: IPartialTheme["palette"] = {
	themePrimary: "#205c9a",
	themeLighterAlt: "#f3f7fb",
	themeLighter: "#d1e0ef",
	themeLight: "#abc6e0",
	themeTertiary: "#6694c2",
	themeSecondary: "#326ca5",
	themeDarkAlt: "#1d538a",
	themeDark: "#184674",
	themeDarker: "#123456",
	neutralLighterAlt: "#ffffff",
	neutralLighter: "#f3f2f1",
	neutralLight: "#edebe9",
	neutralQuaternaryAlt: "#e1dfdd",
	neutralQuaternary: "#d0d0d0",
	neutralTertiaryAlt: "#c8c6c4",
	neutralTertiary: "#a19f9d",
	neutralSecondary: "#605e5c",
	neutralPrimaryAlt: "#3b3a39",
	neutralPrimary: "#323130",
	neutralDark: "#201f1e",
	black: "#000000",
	white: "#ffffff",
}

export const lightTheme = createTheme({
	defaultFontStyle: {
		fontFamily: "Roboto",
		color: palette.black,
	},
	palette,
})
