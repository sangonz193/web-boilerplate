import { css, makeStyles } from "@fluentui/react"

export type DivStyleProps = {
	className: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => {
	return {
		wrapper: {
			display: "flex",
			flexDirection: "column",
		},
	}
})

export function useDivStyles(props: DivStyleProps) {
	const styles = useStyles()

	return {
		wrapper: css(styles.wrapper, props.className),
	}
}
