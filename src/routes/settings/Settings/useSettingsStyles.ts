import { makeStyles } from "@fluentui/react"

export type SettingsStyleProps = {}

const useStyles = makeStyles((theme) => {
	const marginLeft = 20

	return {
		wrapper: {
			flex: 1,
			paddingBottom: 20,

			backgroundColor: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		appearanceSection: {
			marginTop: marginLeft,
			marginLeft,
		},

		aboutSection: {
			marginLeft,
		},
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSettingsStyles(props: SettingsStyleProps = {}) {
	const styles = useStyles()

	return {
		wrapper: styles.wrapper,
		appearanceSection: styles.appearanceSection,
		aboutSection: styles.aboutSection,
	}
}
