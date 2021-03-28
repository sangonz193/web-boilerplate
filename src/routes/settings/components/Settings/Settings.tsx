import { createComponent } from "../../../../components/_utils/createComponent"
import { renderSettings } from "./renderSettings"
import { SettingsProps, SettingsSlots, SettingsState, SettingsStyles } from "./Settings.types"
import { useSettingsSlots } from "./useSettingsSlots"
import { useSettingsState } from "./useSettingsState"
import { useSettingsStyles } from "./useSettingsStyles"

export const Settings = createComponent<SettingsProps, SettingsState, SettingsSlots, SettingsStyles>({
	name: "Settings",
	useState: useSettingsState,
	useStyles: useSettingsStyles,
	useSlots: useSettingsSlots,
	render: renderSettings,
})
