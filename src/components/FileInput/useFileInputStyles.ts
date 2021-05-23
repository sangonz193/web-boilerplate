import { css, makeStyles } from "@fluentui/react"
import { getUuid } from "@sangonz193/utils/getUuid"

export type FileInputStyleProps = {
	className: string | undefined
}

export const fileInputClassNames = {
	clearIcon: `clearIcon-${getUuid()}`,
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			maxWidth: "100%",
		},

		dropzone: {
			display: "flex",
			width: "100%",
			marginRight: "auto",
			flexDirection: "row",
		},

		fileNameContainer: {
			display: "flex",
			flexGrow: 1,
			borderRight: "none",
			maxWidth: "100%",
		},

		fileNameTextField: {
			margin: "auto 0",
			flexGrow: 1,
			minWidth: 0,

			textOverflow: "ellipsis",
			whiteSpace: "nowrap",

			".ms-TextField-fieldGroup": {
				border: `1px solid ${theme.semanticColors.inputBorder}`,
				backgroundColor: theme.semanticColors.inputBackground,
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
				borderRight: "none",
			},

			".ms-TextField-suffix": {
				padding: 0,
			},

			'div[role="alert"]': {
				overflow: "visible",
			},
		},

		clearButton: {
			height: "100%",

			[`& .${fileInputClassNames.clearIcon}`]: {
				color: theme.semanticColors.menuItemText,
			},

			[`&:hover .${fileInputClassNames.clearIcon}`]: {
				color: theme.semanticColors.menuItemTextHovered,
			},
		},

		clearIcon: [fileInputClassNames.clearIcon],

		selectFileButton: {
			height: 32,
			borderColor: theme.semanticColors.inputBorder,
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			flexShrink: 0,
		},
	}
})

export function useFileInputStyles(props: FileInputStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, props.className),
		dropzone: css(styles.dropzone),
		fileNameContainer: css(styles.fileNameContainer),
		fileNameTextField: css(styles.fileNameTextField),
		selectFileButton: css(styles.selectFileButton),
		clearButton: css(styles.clearButton),
		clearIcon: css(fileInputClassNames.clearIcon),
	}
}
