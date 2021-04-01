import { css, makeStyles } from "@fluentui/react"

export type HeaderStyleProps = {
	className: string | undefined
}

const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			flexDirection: "row",
			height: 50,
			flexShrink: 0,

			borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`,
			backgroundColor: theme.palette.neutralLighterAlt,

			zIndex: 1,
		},

		title: [
			theme.fonts.xLarge,
			{
				marginRight: "auto",
				alignSelf: "center",
				padding: "0 20px",
				whiteSpace: "nowrap",
				display: "block",
				overflow: "hidden",
				textOverflow: "ellipsis",

				color: theme.semanticColors.bodyText,
			},
		],
	}
})

export function useHeaderStyles(props: HeaderStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, props.className),
		title: styles.title,
	}
}
