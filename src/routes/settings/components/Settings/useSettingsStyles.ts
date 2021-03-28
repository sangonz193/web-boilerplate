import { makeStyles } from "@fluentui/react"

import { SettingsState, SettingsStyles } from "./Settings.types"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			padding: 20,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSettingsStyles(state: SettingsState): SettingsStyles {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
	}
}
