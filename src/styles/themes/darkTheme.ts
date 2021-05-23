import type { IPartialTheme } from "@fluentui/react/lib/Styling"
import { createTheme } from "@fluentui/react/lib/Styling"

const palette: IPartialTheme["palette"] = {
	themePrimary: "#4796e6",
	themeLighterAlt: "#030609",
	themeLighter: "#0b1825",
	themeLight: "#152d45",
	themeTertiary: "#2b5a8a",
	themeSecondary: "#3f84ca",
	themeDarkAlt: "#58a0e8",
	themeDark: "#70aeec",
	themeDarker: "#94c2f1",
	neutralLighterAlt: "#343434",
	neutralLighter: "#3d3d3d",
	neutralLight: "#4a4a4a",
	neutralQuaternaryAlt: "#525252",
	neutralQuaternary: "#595959",
	neutralTertiaryAlt: "#757575",
	neutralTertiary: "#f6f6f6",
	neutralSecondary: "#f8f8f8",
	neutralPrimaryAlt: "#f9f9f9",
	neutralPrimary: "#f2f2f2",
	neutralDark: "#fcfcfc",
	black: "#fdfdfd",
	white: "#2b2b2b",
}

export const darkTheme = createTheme({
	defaultFontStyle: {
		fontFamily: "Roboto",
		color: palette.black,
	},
	palette,
	isInverted: true,
})
