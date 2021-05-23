import type { IChoiceGroupOption, IChoiceGroupProps } from "@fluentui/react"
import { ChoiceGroup, Label, Stack, Text } from "@fluentui/react"
import identity from "lodash/identity"
import React from "react"

import { useLayoutOptions } from "../../../components/Layout/useLayoutOptions"
import { appConfig } from "../../../config/app.config"
import { useDocumentTitle } from "../../../hooks/useDocumentTitle"
import { useReactiveVars } from "../../../hooks/useReactiveVars"
import { useAppearanceStore } from "../../../modules/Appearance"
import { isThemeKey, ThemeKey } from "../../../styles/themes"
import { useSettingsStyles } from "./useSettingsStyles"

export type SettingsProps = {
	children?: undefined
}

const SettingsComponent: React.FC<SettingsProps> = () => {
	const styles = useSettingsStyles()

	useDocumentTitle(`Settings - ${appConfig.name}`)
	useLayoutOptions({
		headerTitle: "Settings",
	})

	const appearanceStore = useAppearanceStore()
	const { themeKey: selectedThemeKey } = useReactiveVars(appearanceStore, ["themeKey"])

	const options = React.useMemo<Array<Omit<IChoiceGroupOption, "key"> & { key: ThemeKey }>>(
		() =>
			Object.values(
				identity<{ [K in ThemeKey]: { key: K; text: string } }>({
					auto: { key: "auto", text: "Auto (browser theme)" },
					light: { key: "light", text: "Light" },
					dark: { key: "dark", text: "Dark" },
					black: { key: "black", text: "Black" },
				})
			),
		[]
	)

	const handleThemeChange = React.useCallback<Exclude<IChoiceGroupProps["onChange"], undefined>>((_, option) => {
		if (option?.key && isThemeKey(option.key)) {
			appearanceStore.setTheme(option.key)
		}
	}, [])

	return (
		<Stack className={styles.wrapper} data-is-scrollable tokens={{ childrenGap: 40 }} disableShrink>
			<Stack className={styles.appearanceSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge">Appearance</Text>

				<Stack horizontal>
					<ChoiceGroup
						selectedKey={selectedThemeKey}
						options={options}
						onChange={handleThemeChange}
						label="Theme"
					/>
				</Stack>
			</Stack>

			<Stack className={styles.aboutSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge">About</Text>

				<Stack horizontal>
					<Stack>
						<Label>Version</Label>
						<Text>{appConfig.version}</Text>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	)
}

export const Settings = React.memo(SettingsComponent)
