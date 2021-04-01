import React from "react"

import { useSettingsStyles } from "./useSettingsStyles"

export type SettingsProps = {
	children?: undefined
}

const SettingsComponent: React.FC<SettingsProps> = () => {
	const styles = useSettingsStyles()

	return <div className={styles.wrapper}>This is the settings page.</div>
}

export const Settings = React.memo(SettingsComponent)
